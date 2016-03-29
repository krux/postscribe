/*! Asynchronously write javascript, even with document.write., v2.0.3 https://krux.github.io/postscribe
Copyright (c) 2016 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {//     postscribe.js 1.4.0
	//     (c) Copyright 2012-2015 to the present, Krux
	//     postscribe is freely distributable under the MIT license.
	//     For all details and documentation:
	//     http://krux.github.io/postscribe

	var WriteStream = __webpack_require__(1);
	var objectAssign = __webpack_require__(4);
	var helpers = __webpack_require__(3);

	// A function that intentionally does nothing.
	function doNothing() {}

	var isFunction = helpers.isFunction;
	var toArray = helpers.toArray;
	var defaults = helpers.defaults;
	var last = helpers.last;
	var eachKey = helpers.eachKey;

	// Available options and defaults.
	var OPTIONS = {
	  // Called when an async script has loaded.
	  afterAsync: doNothing,
	  // Called immediately before removing from the write queue.
	  afterDequeue: doNothing,
	  // Called sync after a stream's first thread release.
	  afterStreamStart: doNothing,
	  // Called after writing buffered document.write calls.
	  afterWrite: doNothing,
	  // Allows disabling the autoFix feature of htmlParser
	  autoFix: true,
	  // Called immediately before adding to the write queue.
	  beforeEnqueue: doNothing,
	  // Called before writing a token.
	  beforeWriteToken: function(tok) { return tok; },
	  // Called before writing buffered document.write calls.
	  beforeWrite: function(str) { return str; },
	  // Called when evaluation is finished.
	  done: doNothing,
	  // Called when a write results in an error.
	  error: function(e) { throw e; },
	  // Called when inline event handlers were extracted, must export into global namespace
	  exportEventHandlers: function (fns, scope) {
	    eachKey(fns, function (name, fnRef) {
	      scope[name] = fnRef;
	    });
	  },
	  // Whether to let scripts w/ async attribute set fall out of the queue.
	  releaseAsync: false
	};

	// Public-facing interface and queuing
	module.exports = (function() {
	  var nextId = 0;

	  var queue = [];

	  var active = null;

	  function nextStream() {
	    var args = queue.shift();
	    var options;
	    if(args) {
	      options = last(args);
	      options.afterDequeue();
	      args.stream = runStream.apply(null, args);
	      options.afterStreamStart();
	    }
	  }

	  function runStream(el, html, options) {
	    active = new WriteStream(el, options);

	    // Identify this stream.
	    active.id = nextId++;
	    active.name = options.name || active.id;
	    postscribe.streams[active.name] = active;

	    // Override document.write.
	    var doc = el.ownerDocument;

	    var stash = {
	      close: doc.close,
	      open: doc.open,
	      write: doc.write,
	      writeln: doc.writeln
	    };

	    function write(str) {
	      str = options.beforeWrite(str);
	      active.write(str);
	      options.afterWrite(str);
	    }

	    objectAssign(doc, {
	      close: doNothing,
	      open: doNothing,
	      write: function(){
	        return write(toArray(arguments).join(''));
	      },
	      writeln: function() {
	        return write(toArray(arguments).join('') + '\n');
	      }
	    });

	    // Override window.onerror
	    var oldOnError = active.win.onerror || doNothing;

	    // This works together with the try/catch around WriteStream::insertScript
	    // In modern browsers, exceptions in tag scripts go directly to top level
	    active.win.onerror = function(msg, url, line) {
	      options.error({ msg: msg + ' - ' + url + ':' + line });
	      oldOnError.apply(active.win, arguments);
	    };

	    // Write to the stream
	    active.write(html, function streamDone() {
	      // restore document.write
	      objectAssign(doc, stash);

	      // restore window.onerror
	      active.win.onerror = oldOnError;

	      options.done();
	      active = null;
	      nextStream();
	    });

	    return active;
	  }

	  function postscribe(el, html, options) {
	    if(isFunction(options)) {
	      options = { done: options };
	    }
	    options = defaults(options, OPTIONS);

	    el =
	      // id selector
	      (/^#/).test(el) ? global.document.getElementById(el.substr(1)) :
	      // jquery object. TODO: loop over all elements.
	      el.jquery ? el[0] : el;


	    var args = [el, html, options];

	    el.postscribe = {
	      cancel: function() {
	        if(args.stream) {
	          // TODO: implement this
	          args.stream.abort();
	        } else {
	          args[1] = doNothing;
	        }
	      }
	    };

	    options.beforeEnqueue(args);
	    queue.push(args);

	    if(!active) {
	      nextStream();
	    }

	    return el.postscribe;
	  }

	  return objectAssign(postscribe, {
	    htmlParser: __webpack_require__(2),
	    // Streams by name.
	    streams: {},
	    // Queue of streams.
	    queue: queue,
	    // Expose internal classes.
	    WriteStream: WriteStream
	  });
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	var htmlParser = __webpack_require__(2);
	var objectAssign = __webpack_require__(4);

	var helpers = __webpack_require__(3);

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



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// A stateless HTML Parser written in JavaScript
	// Based on http://ejohn.org/blog/pure-javascript-html-parser/
	// Turns an HTML string into a token iterator.

	//TODO(#39)
	/*globals console:false*/
	var supports = (function() {
	  var target = {};

	  var html;
	  var work = document.createElement('div');

	  html = '<P><I></P></I>';
	  work.innerHTML = html;
	  target.tagSoup = work.innerHTML !== html;

	  work.innerHTML = '<P><i><P></P></i></P>';
	  target.selfClose = work.childNodes.length === 2;

	  return target;
	})();

	var escapeQuotes = __webpack_require__(3).escapeQuotes;

	// Regular Expressions for parsing tags and attributes
	var startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
	var endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/;
	var attr = /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g;
	var fillAttr = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;
	var inlineEventHandler = /^on[a-z]+/;

	var DEBUG = false;

	function htmlParser(stream, options) {
	  stream = stream || '';

	  // Options
	  options = options || {};

	  for(var key in supports) {
	    if(supports.hasOwnProperty(key)) {
	      if(options.autoFix) {
	        options['fix_' + key] = true;//!supports[key];
	      }
	      options.fix = options.fix || options['fix_' + key];
	    }
	  }

	  var unescapeURLs = function(html) {
	    if ( (typeof html === 'string') && (html.indexOf('&') !== -1) ) {
	      html = html.replace('amp;', '').replace(/(&#\d{1,4};)/gm, function(match){
	          var code = match.substring(2,match.length-1);
	          return String.fromCharCode(code);
	        });
	    }
	    return encodeURI(html);
	  };

	  // Cache div element for unescaping html entities
	  var el = document.createElement('div');

	  var unescapeHTMLEntities = function(html) {
	    if ( (typeof html === 'string') && (html.indexOf('&') !== -1) ) {
	      el.innerHTML = html;
	      // ie and ff differ
	      return el.textContent || el.innerText || html;
	    }
	    else {
	      return html;
	    }
	  };

	  var append = function(str) {
	    stream += str;
	  };

	  var prepend = function(str) {
	    stream = str + stream;
	  };

	  // Order of detection matters: detection of one can only
	  // succeed if detection of previous didn't
	  var detect = {
	    comment: /^<!--/,
	    endTag: /^<\//,
	    atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
	    startTag: /^</,
	    chars: /^[^<]/
	  };

	  // Detection has already happened when a reader is called.
	  var reader = {

	    comment: function() {
	      var index = stream.indexOf('-->');
	      if ( index >= 0 ) {
	        return {
	          content: stream.substr(4, index - 1),
	          length: index + 3
	        };
	      }
	    },

	    endTag: function() {
	      var match = stream.match( endTag );

	      if ( match ) {
	        return {
	          tagName: match[1],
	          length: match[0].length
	        };
	      }
	    },

	    atomicTag: function() {
	      var start = reader.startTag();
	      if(start) {
	        var rest = stream.slice(start.length);
	        // for optimization, we check first just for the end tag
	        if(rest.match(new RegExp('<\/\\s*' + start.tagName + '\\s*>', 'i'))) {
	          // capturing the content is inefficient, so we do it inside the if
	          var match = rest.match(new RegExp('([\\s\\S]*?)<\/\\s*' + start.tagName + '\\s*>', 'i'));
	          if(match) {
	            // good to go
	            return {
	              tagName: start.tagName,
	              attrs: start.attrs,
	              content: match[1],
	              length: match[0].length + start.length
	            };
	          }
	        }
	      }
	    },

	    startTag: function() {

	      var endTagIndex = stream.indexOf('>');
	      if(endTagIndex === -1) {
	        return null; //avoid the match statement if there will be no match
	      }

	      var match = stream.match( startTag );

	      if ( match ) {
	        var attrs = {};
	        var booleanAttrs = {};
	        var rest = match[2];

	        match[2].replace(attr, function(matched, name) {
	          if (!(arguments[2] || arguments[3] || arguments[4] || arguments[5])) {
	            attrs[name] = null;
	          } else if (arguments[5]) {
	            attrs[arguments[5]] = '';
	            booleanAttrs[name] = true;
	          } else {
	            var value = arguments[2] || arguments[3] || arguments[4] ||
	              fillAttr.test(name) && name || '';
	            attrs[name] = (name === 'src') ? unescapeURLs(value) : unescapeHTMLEntities(value);
	          }
	          rest = rest.replace(matched, '');
	        });

	        return {
	          tagName: match[1],
	          attrs: attrs,
	          booleanAttrs: booleanAttrs,
	          rest: rest,
	          unary: !!match[3],
	          length: match[0].length
	        };
	      }
	    },

	    chars: function() {
	      var index = stream.indexOf('<');
	      return {
	        length: index >= 0 ? index : stream.length
	      };
	    }
	  };

	  var readToken = function() {

	    // Enumerate detects in order
	    for (var type in detect) {

	      if(detect[type].test(stream)) {
	        if(DEBUG) { console.log('suspected ' + type); }

	        var token = reader[type]();
	        if(token) {
	          if(DEBUG) { console.log('parsed ' + type, token); }
	          // Type
	          token.type = token.type || type;
	          // Entire text
	          token.text = stream.substr(0, token.length);
	          // Update the stream
	          stream = stream.slice(token.length);

	          return token;
	        }
	        return null;
	      }
	    }
	  };

	  var readTokens = function(handlers) {
	    var tok;
	    while((tok = readToken())) {
	      // continue until we get an explicit "false" return
	      if(handlers[tok.type] && handlers[tok.type](tok) === false) {
	        return;
	      }
	    }
	  };

	  var clear = function() {
	    var rest = stream;
	    stream = '';
	    return rest;
	  };

	  var rest = function() {
	    return stream;
	  };
	  var stack = [];
	  if(options.fix) {
	    (function() {
	      // Empty Elements - HTML 4.01
	      var EMPTY = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;

	      // Elements that you can| intentionally| leave open
	      // (and which close themselves)
	      var CLOSESELF = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;


	      stack = [];
	      stack.last = function() {
	        return this[this.length - 1];
	      };
	      stack.lastTagNameEq = function(tagName) {
	        var last = this.last();
	        return last && last.tagName &&
	          last.tagName.toUpperCase() === tagName.toUpperCase();
	      };

	      stack.containsTagName = function(tagName) {
	        for (var i = 0, tok; (tok === this[i]); i++) { // TODO AMBROOS
	          if(tok.tagName === tagName) {
	            return true;
	          }
	        }
	        return false;
	      };

	      var correct = function(tok) {
	        if(tok && tok.type === 'startTag') {
	          // unary
	          tok.unary = EMPTY.test(tok.tagName) || tok.unary;
	          tok.html5Unary = !/\/>$/.test(tok.text);
	        }
	        return tok;
	      };

	      var readTokenImpl = readToken;

	      var peekToken = function() {
	        var tmp = stream;
	        var tok = correct(readTokenImpl());
	        stream = tmp;
	        return tok;
	      };

	      var closeLast = function() {
	        var tok = stack.pop();

	        // prepend close tag to stream.
	        prepend('</' + tok.tagName + '>');
	      };

	      var handlers = {
	        startTag: function(tok) {
	          var tagName = tok.tagName;
	          // Fix tbody
	          if(tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
	            prepend('<TBODY>');
	            prepareNextToken();
	          } else if(options.fix_selfClose && CLOSESELF.test(tagName) && stack.containsTagName(tagName)) {
	            if(stack.lastTagNameEq(tagName)) {
	              closeLast();
	            } else {
	              prepend('</' + tok.tagName + '>');
	              prepareNextToken();
	            }
	          } else if (!tok.unary) {
	            stack.push(tok);
	          }
	        },

	        endTag: function(tok) {
	          var last = stack.last();
	          if(last) {
	            if(options.fix_tagSoup && !stack.lastTagNameEq(tok.tagName)) {
	              // cleanup tag soup
	              closeLast();
	            } else {
	              stack.pop();
	            }
	          } else if (options.fix_tagSoup) {
	            // cleanup tag soup part 2: skip this token
	            skipToken();
	          }
	        }
	      };

	      var skipToken = function() {
	        // shift the next token
	        readTokenImpl();

	        prepareNextToken();
	      };

	      var prepareNextToken = function() {
	        var tok = peekToken();
	        if(tok && handlers[tok.type]) {
	          handlers[tok.type](tok);
	        }
	      };

	      // redefine readToken
	      readToken = function() {
	        prepareNextToken();
	        return correct(readTokenImpl());
	      };
	    })();
	  }

	  return {
	    append: append,
	    readToken: readToken,
	    readTokens: readTokens,
	    clear: clear,
	    rest: rest,
	    stack: stack
	  };

	}

	htmlParser.supports = supports;

	htmlParser.tokenToString = function(rootTok, fns) {
	  var fnStash = {
	    nextName: function (eventAttrib) {
	      return '__psIFX_' + (+new Date()) + '_' + (Math.random() * 99999 | 0) + '_' + (eventAttrib || 'anon');
	    },
	    push: function (eventAttrib, srcStr) {
	      var name = this.nextName(eventAttrib);
	      while (fns.hasOwnProperty(name)) {
	        name = this.nextName(eventAttrib);
	      }
	      fns[name] = new Function(srcStr);
	      return name;
	    }
	  };
	  var handler = {
	    comment: function(tok) {
	      return '<!--' + tok.content;
	    },
	    endTag: function(tok) {
	      return '</' + tok.tagName + '>';
	    },
	    atomicTag: function(tok) {
	      if(DEBUG) { console.log(tok); }
	      return handler.startTag(tok) +
	            tok.content +
	            handler.endTag(tok);
	    },
	    startTag: function(tok) {
	      var str = '<' + tok.tagName;
	      for (var key in tok.attrs) {
	        str += ' ' + key;

	        var val = tok.attrs[key];
	        if (typeof tok.booleanAttrs === 'undefined' || typeof tok.booleanAttrs[key] === 'undefined') {
	          if (inlineEventHandler.test(key)) {
	            try {
	              str += '="' + fnStash.push(key, val) + '.call(this);"';
	            } catch (e) {
	              throw new Error('Failed replacing inline event handler with function for ' + key + ': ' + e.message);
	            }
	          } else {
	            // escape quotes
	            str += '="' + escapeQuotes(val) + '"';
	          }
	        }
	      }
	      if (tok.rest) {
	        str += tok.rest;
	      }
	      return str + (tok.unary && !tok.html5Unary ? '/>' : '>');
	    },
	    chars: function(tok) {
	      return tok.text;
	    }
	  };
	  return handler[rootTok.type](rootTok);
	};

	htmlParser.escapeAttributes = function(attrs) {
	  var escapedAttrs = {};
	  // escape double-quotes for writing html as a string

	  for (var name in attrs) {
	    var value = attrs[name];
	    escapedAttrs[name] = escapeQuotes(value);
	  }
	  return escapedAttrs;
	};

	for (var key in supports) {
	  htmlParser.browserHasFlaw = htmlParser.browserHasFlaw || (!supports[key]) && key;
	}

	module.exports = htmlParser;


/***/ },
/* 3 */
/***/ function(module, exports) {

	// Is this a function?
	function isFunction(x) {
	  return typeof x === 'function';
	}

	// Loop over each item in an array-like value.
	function each(arr, fn, _this) {
	  var i, len = (arr && arr.length) || 0;
	  for(i = 0; i < len; i++) {
	    fn.call(_this, arr[i], i);
	  }
	}

	// Loop over each key/value pair in a hash.
	function eachKey(obj, fn, _this) {
	  var key;
	  for(key in obj) {
	    if(obj.hasOwnProperty(key)) {
	      fn.call(_this, key, obj[key]);
	    }
	  }
	}

	function escapeQuotes(str) {
	  return (str ? str.replace(/(^|[^\\])"/g, '$1\\\"') : '');
	}

	function existy(thing) {
	  return thing !== void 0 && thing !== null;
	}

	// Set default options where some option was not specified.
	function defaults(options, _defaults) {
	  options = options || {};
	  eachKey(_defaults, function(key, val) {
	    if(!existy(options[key])) {
	      options[key] = val;
	    }
	  });
	  return options;
	}

	// Convert value (e.g., a NodeList) to an array.
	function toArray(obj) {
	  try {
	    return Array.prototype.slice.call(obj);
	  } catch(e) {
	    var ret = [];
	    each(obj, function(val) {
	      ret.push(val);
	    });
	    return ret;
	  }
	}

	function last(array) {
	  return array[array.length - 1];
	}

	// Test if token is a script tag.
	function isScript(tok) {
	  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('script');
	}

	function isStyle(tok) {
	  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('style');
	}

	module.exports = {
	  isFunction: isFunction,
	  each: each,
	  eachKey: eachKey,
	  escapeQuotes: escapeQuotes,
	  existy: existy,
	  defaults: defaults,
	  toArray: toArray,
	  last: last,
	  isScript: isScript,
	  isStyle: isStyle
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("object-assign");

/***/ }
/******/ ]);