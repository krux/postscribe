// # Class WriteStream

// Stream static html to an element, where "static html" denotes "html without scripts".

// This class maintains a *history of writes devoid of any attributes* or "proxy history".
// Injecting the proxy history into a temporary div has no side-effects,
// other than to create proxy elements for previously written elements.

// Given the `staticHtml` of a new write, a `tempDiv`'s innerHTML is set to `proxy_history + staticHtml`.
// The *structure* of `tempDiv`'s contents, (i.e., the placement of new nodes beside or inside of proxy elements),
// reflects the DOM structure that would have resulted if all writes had been squashed into a single write.

// For each descendent `node` of `tempDiv` whose parentNode is a *proxy*, `node` is appended to the corresponding *real* element within the DOM.

// Proxy elements are mapped to *actual* elements in the DOM by injecting a data-id attribute into each start tag in `staticHtml`.
var htmlParser = require('./htmlParser.js');
var objectAssign = require('object-assign');

var helpers = require('./helpers.js');

var isFunction = helpers.isFunction;
var each = helpers.each;
var eachKey = helpers.eachKey;
var existy = helpers.existy;
var toArray = helpers.toArray;
var isScript = helpers.isScript;
var isStyle = helpers.isStyle;

// Turn on to debug how each chunk affected the DOM.
var DEBUG_CHUNK = false;

module.exports = (function() {

  // Prefix for data attributes on DOM elements.
  var BASEATTR = 'data-ps-';

  // get / set data attributes
  function data(el, name, value) {
    var attr = BASEATTR + name;

    if(arguments.length === 2) {
      // Get
      var val = el.getAttribute(attr);

      // IE 8 returns a number if it's a number
      return !existy(val) ? val : String(val);

    } else if(existy(value) && value !== '') {
      // Set
      el.setAttribute(attr, value);

    } else {
      // Remove
      el.removeAttribute(attr);
    }
  }

  function WriteStream(root, options) {
    var doc = root.ownerDocument;

    objectAssign(this, {
      root: root,

      options: options,

      win: doc.defaultView || doc.parentWindow,

      doc: doc,

      parser: htmlParser('', { autoFix: options.autoFix }),

      // Actual elements by id.
      actuals: [root],

      // Embodies the "structure" of what's been written so far, devoid of attributes.
      proxyHistory: '',

      // Create a proxy of the root element.
      proxyRoot: doc.createElement(root.nodeName),

      scriptStack: [],

      writeQueue: []
    });

    data(this.proxyRoot, 'proxyof', 0);

  }

  WriteStream.prototype.write = function() {
    [].push.apply(this.writeQueue, arguments);
    // Process writes
    // When new script gets pushed or pending this will stop
    // because new writeQueue gets pushed
    var arg;
    while(!this.deferredRemote &&
          this.writeQueue.length) {
      arg = this.writeQueue.shift();

      if(isFunction(arg)) {
        this.callFunction(arg);
      } else {
        this.writeImpl(arg);
      }
    }
  };

  WriteStream.prototype.callFunction = function(fn) {
    var tok = { type: 'function', value: fn.name || fn.toString() };
    this.onScriptStart(tok);
    fn.call(this.win, this.doc);
    this.onScriptDone(tok);
  };

  WriteStream.prototype.writeImpl = function(html) {
    this.parser.append(html);

    var tok, tokens = [], script, style;

    // stop if we see a script token
    while((tok = this.parser.readToken()) && !(script = isScript(tok)) && !(style = isStyle(tok))) {
      tok = this.options.beforeWriteToken(tok);

      if (tok) {
        tokens.push(tok);
      }
    }

    this.writeStaticTokens(tokens);

    if(script) {
      this.handleScriptToken(tok);
    }
    if(style){
      this.handleStyleToken(tok);
    }
  };

  // ## Contiguous non-script tokens (a chunk)
  WriteStream.prototype.writeStaticTokens = function(tokens) {

    var chunk = this.buildChunk(tokens);

    if(!chunk.actual) {
      // e.g., no tokens, or a noscript that got ignored
      return;
    }

    // Export extracted inline event handlers (side-effect)
    this.options.exportEventHandlers(chunk.fns, this.win);

    chunk.html = this.proxyHistory + chunk.actual;
    this.proxyHistory += chunk.proxy;

    this.proxyRoot.innerHTML = chunk.html;

    if(DEBUG_CHUNK) {
      chunk.proxyInnerHTML = this.proxyRoot.innerHTML;
    }

    this.walkChunk();

    if(DEBUG_CHUNK) {
      chunk.actualInnerHTML = this.root.innerHTML; //root
    }

    return chunk;
  };

  WriteStream.prototype.buildChunk = function (tokens) {
    var nextId = this.actuals.length,

        // The raw html of this chunk.
        raw = [],

        // The html to create the nodes in the tokens (with id's injected).
        actual = [],

        // Html that can later be used to proxy the nodes in the tokens.
        proxy = [],

        // Extracted inline event handler function objects
        fns = {};

    each(tokens, function(tok) {

      var tokenRaw = htmlParser.tokenToString(tok, fns);

      raw.push(tokenRaw);

      if(tok.attrs) { // tok.attrs <==> startTag or atomicTag or cursor
        // Ignore noscript tags. They are atomic, so we don't have to worry about children.
        if(!(/^noscript$/i).test(tok.tagName)) {
          var id = nextId++;

          // Actual: inject id attribute: replace '>' at end of start tag with id attribute + '>'
          actual.push(
            tokenRaw.replace(/(\/?>)/, ' ' + BASEATTR + 'id=' + id + ' $1')
          );

          // Don't proxy scripts: they have no bearing on DOM structure.
          if(tok.attrs.id !== 'ps-script' && tok.attrs.id !== 'ps-style') {
            // Proxy: strip all attributes and inject proxyof attribute
            proxy.push(
              // ignore atomic tags (e.g., style): they have no "structural" effect
              tok.type === 'atomicTag' ? '' :
                '<' + tok.tagName + ' ' + BASEATTR + 'proxyof=' + id + (tok.unary ? ' />' : '>')
            );
          }
        }

      } else {
        // Visit any other type of token
        // Actual: append.
        actual.push(tokenRaw);
        // Proxy: append endTags. Ignore everything else.
        proxy.push(tok.type === 'endTag' ? tokenRaw : '');
      }
    });

    return {
      fns: fns,
      tokens: tokens,
      raw: raw.join(''),
      actual: actual.join(''),
      proxy: proxy.join('')
    };
  };

  WriteStream.prototype.walkChunk = function() {
    var node, stack = [this.proxyRoot];

    // use shift/unshift so that children are walked in document order

    while(existy(node = stack.shift())) {

      var isElement = node.nodeType === 1;
      var isProxy = isElement && data(node, 'proxyof');

      // Ignore proxies
      if(!isProxy) {

        if(isElement) {
          // New actual element: register it and remove the the id attr.
          this.actuals[data(node, 'id')] = node;
          data(node, 'id', null);
        }

        // Is node's parent a proxy?
        var parentIsProxyOf = node.parentNode && data(node.parentNode, 'proxyof');
        if(parentIsProxyOf) {
          // Move node under actual parent.
          this.actuals[parentIsProxyOf].appendChild(node);
        }
      }
      // prepend childNodes to stack
      stack.unshift.apply(stack, toArray(node.childNodes));
    }
  };

  // ### Script tokens
  WriteStream.prototype.handleScriptToken = function(tok) {
    var remainder = this.parser.clear();

    if(remainder) {
      // Write remainder immediately behind this script.
      this.writeQueue.unshift(remainder);
    }

    //noinspection JSUnresolvedVariable
    tok.src = tok.attrs.src || tok.attrs.SRC;

    tok = this.options.beforeWriteToken(tok);

    if(!tok) {
      // User has removed this token
      return;
    }

    if(tok.src && this.scriptStack.length) {
      // Defer this script until scriptStack is empty.
      // Assumption 1: This script will not start executing until
      // scriptStack is empty.
      this.deferredRemote = tok;
    } else {
      this.onScriptStart(tok);
    }

    // Put the script node in the DOM.
    var that = this;
    this.writeScriptToken(tok, function() {
      that.onScriptDone(tok);
    });

  };

  // ### Style tokens
  WriteStream.prototype.handleStyleToken = function(tok) {
    var remainder = this.parser.clear();

    if(remainder) {
      // Write remainder immediately behind this style.
      this.writeQueue.unshift(remainder);
    }

    tok.type = tok.attrs.type || tok.attrs.TYPE || 'text/css';

    tok = this.options.beforeWriteToken(tok);

    if(tok) {
      // Put the style node in the DOM.
      this.writeStyleToken(tok);
    }

    if(remainder) {
      this.write();
    }
  };

  // Build a style and insert it into the DOM.
  WriteStream.prototype.writeStyleToken = function(tok) {
    var el = this.buildStyle(tok);

    this.insertStyle(el);

    // Set content
    if(tok.content) {
      //noinspection JSUnresolvedVariable
      if(el.styleSheet && !el.sheet) {
        el.styleSheet.cssText = tok.content;
      }
      else {
        el.appendChild(this.doc.createTextNode(tok.content));
      }
    }
  };

  // Build a style element from an atomic style token.
  WriteStream.prototype.buildStyle = function(tok) {
    var el = this.doc.createElement(tok.tagName);

    el.setAttribute('type', tok.type);
    // Set attributes
    eachKey(tok.attrs, function(name, value) {
      el.setAttribute(name, value);
    });

    return el;
  };

  // Insert style into DOM where it would naturally be written.
  WriteStream.prototype.insertStyle = function(el) {
    // Append a span to the stream. That span will act as a cursor
    // (i.e. insertion point) for the style.
    this.writeImpl('<span id="ps-style"/>');

    // Grab that span from the DOM.
    var cursor = this.doc.getElementById('ps-style');

    // Replace cursor with style.
    cursor.parentNode.replaceChild(el, cursor);
  };

  WriteStream.prototype.onScriptStart = function(tok) {
    tok.outerWrites = this.writeQueue;
    this.writeQueue = [];
    this.scriptStack.unshift(tok);
  };

  WriteStream.prototype.onScriptDone = function(tok) {
    // Pop script and check nesting.
    if(tok !== this.scriptStack[0]) {
      this.options.error({ message: 'Bad script nesting or script finished twice' });
      return;
    }
    this.scriptStack.shift();

    // Append outer writes to queue and process them.
    this.write.apply(this, tok.outerWrites);

    // Check for pending remote

    // Assumption 2: if remote_script1 writes remote_script2 then
    // the we notice remote_script1 finishes before remote_script2 starts.
    // I think this is equivalent to assumption 1
    if(!this.scriptStack.length && this.deferredRemote) {
      this.onScriptStart(this.deferredRemote);
      this.deferredRemote = null;
    }
  };

  // Build a script and insert it into the DOM.
  // Done is called once script has executed.
  WriteStream.prototype.writeScriptToken = function(tok, done) {
    var el = this.buildScript(tok);
    var asyncRelease = this.shouldRelease(el);
    var afterAsync = this.options.afterAsync;

    if(tok.src) {
      // Fix for attribute "SRC" (capitalized). IE does not recognize it.
      el.src = tok.src;
      this.scriptLoadHandler(el, !asyncRelease ? function() {
        done();
        afterAsync();
      } : afterAsync);
    }

    try {
      this.insertScript(el);
      if(!tok.src || asyncRelease) {
        done();
      }
    } catch(e) {
      this.options.error(e);
      done();
    }
  };

  // Build a script element from an atomic script token.
  WriteStream.prototype.buildScript = function(tok) {
    var el = this.doc.createElement(tok.tagName);

    // Set attributes
    eachKey(tok.attrs, function(name, value) {
      el.setAttribute(name, value);
    });

    // Set content
    if(tok.content) {
      el.text = tok.content;
    }

    return el;
  };

  // Insert script into DOM where it would naturally be written.
  WriteStream.prototype.insertScript = function(el) {
    // Append a span to the stream. That span will act as a cursor
    // (i.e. insertion point) for the script.
    this.writeImpl('<span id="ps-script"/>');

    // Grab that span from the DOM.
    var cursor = this.doc.getElementById('ps-script');

    // Replace cursor with script.
    cursor.parentNode.replaceChild(el, cursor);
  };

  WriteStream.prototype.scriptLoadHandler = function(el, done) {
    function cleanup() {
      el = el.onload = el.onreadystatechange = el.onerror = null;
    }

    // Error handler
    var error = this.options.error;

    function success() {
      cleanup();
      done();
    }

    function failure(err) {
      cleanup();
      error(err);
      done();
    }

    // Set handlers
    objectAssign(el, {
      onload: function() {
        success();
      },

      onreadystatechange: function() {
        if(/^(loaded|complete)$/.test( el.readyState )) {
          success();
        }
      },

      onerror: function() {
        failure({ message: 'remote script failed ' + el.src });
      }
    });
  };

  WriteStream.prototype.shouldRelease = function(el) {
    var isScriptRegex = /^script$/i.test(el.nodeName);
    return !isScriptRegex || !!(this.options.releaseAsync && el.src && el.hasAttribute('async'));
  };

  return WriteStream;

})();

