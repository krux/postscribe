//     postscribe.js 1.0.4
//     (c) 2012 Krux
//     postscribe is freely distributable under the MIT license.
//     For all details and documentation:
//     http://krux.github.com/postscribe


(function() {

  var globals = this;

  if(globals.postscribe) {
    return;
  }

  // Debug write tasks.
  var DEBUG = true;

  // Turn on to debug how each chunk affected the DOM.
  var DEBUG_CHUNK = false;

  // # Helper Functions

  var slice = Array.prototype.slice;

  // A function that intentionally does nothing.
  function doNothing() {}


  // Is this a function?
  function isFunction(x) {
    return "function" == typeof x;
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

  // Set properties on an object.
  function set(obj, props) {
    eachKey(props, function(key, value) {
      obj[key] = value;
    });
    return obj;
  }

  // Set default options where some option was not specified.
  function defaults(options, _defaults) {
    options = options || {};
    eachKey(_defaults, function(key, val) {
      if(options[key] == null) {
        options[key] = val;
      }
    });
    return options;
  }

  // Convert value (e.g., a NodeList) to an array.
  function toArray(obj) {
    try {
      return slice.call(obj);
    } catch(e) {
      var ret = [];
      each(obj, function(val) {
        ret.push(val);
      });
      return ret;
    }
  }

  // Test if token is a script tag.
  function isScript(tok) {
    return (/^script$/i).test(tok.tagName);
  }

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
  var WriteStream = (function(){

    // Prefix for data attributes on DOM elements.
    var BASEATTR = 'data-ps-';

    // get / set data attributes
    function data(el, name, value) {
      var attr = BASEATTR + name;

      if(arguments.length === 2) {
        // Get
        var val = el.getAttribute(attr);

        // IE 8 returns a number if it's a number
        return val == null ? val : String(val);

      } else if( value != null && value !== '') {
        // Set
        el.setAttribute(attr, value);

      } else {
        // Remove
        el.removeAttribute(attr);
      }
    }

    function WriteStream(root) {
      // Actual elements by id.
      this.actuals = [root];

      // Embodies the "structure" of what's been written so far, devoid of attributes.
      this.proxyHistory = '';

      // Create a proxy of the root element.
      this.proxyRoot = root.ownerDocument.createElement(root.nodeName);
      data(this.proxyRoot, 'proxyof', 0);
    }

    WriteStream.prototype.buildChunk = function (tokens) {
      var nextId = this.actuals.length,

          // The raw html of this chunk.
          raw = [],

          // The html to create the nodes in the tokens (with id's injected).
          actual = [],

          // Html that can later be used to proxy the nodes in the tokens.
          proxy = [];

      each(tokens, function(tok) {
        raw.push(tok.text);

        if(tok.attrs) {
          // Visit a token with attributes (startTag or atomicTag).
          // Ignore noscript tags. They are atomic, so we don't have to worry about children.
          if(!(/^noscript$/i).test(tok.tagName)) {
            var id = nextId++;

            // Actual: inject id attribute: replace '>' at end of start tag with id attribute + '>'
            actual.push(
              tok.text.replace(/(\/?>)/, ' '+BASEATTR+'id='+id+' $1')
            );

            // Proxy: strip all attributes and inject proxyof attribute
            proxy.push(
              // ignore atomic tags (e.g., style): they have no "structural" effect
              tok.type === 'atomicTag' ? '' :
                '<'+tok.tagName+' '+BASEATTR+'proxyof='+id+(tok.unary ? '/>' : '>')
            );
          }

        } else {
          // Visit any other type of token
          // Actual: append.
          actual.push(tok.text);
          // Proxy: append endTags. Ignore everything else.
          proxy.push(tok.type === 'endTag' ? tok.text : '');
        }
      });

      return {
        tokens: tokens,
        raw: raw.join(''),
        actual: actual.join(''),
        proxy: proxy.join('')
      };
    };

    WriteStream.prototype.write = function(tokens) {

      var chunk = this.buildChunk(tokens);

      if(!chunk.actual) {
        // e.g., no tokens, or a noscript that got ignored
        return;
      }
      chunk.html = this.proxyHistory + chunk.actual;
      this.proxyHistory += chunk.proxy;

      this.proxyRoot.innerHTML = chunk.html;

      if(DEBUG_CHUNK) {
        chunk.proxyInnerHTML = this.proxyRoot.innerHTML;
      }

      this.walkNodes();

      if(DEBUG_CHUNK) {
        chunk.actualInnerHTML = this.actuals[0].innerHTML; //root
      }

      return chunk;
    };


    WriteStream.prototype.walkNodes = function() {
      var node, stack = [this.proxyRoot];

      // use shift/unshift so that children are walked in document order

      while((node = stack.shift()) != null) {

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

    return WriteStream;

  }());

  // # Class Worker
  // Perform tasks in the context of an element.
  var Worker = (function() {

    function Worker(el, options) {
      // Default options

      var doc = el.ownerDocument;

      set(this, {

        root: el,

        options: defaults(options, { error: doNothing }),

        stream: new WriteStream(el),

        parser: globals.htmlParser('', { autoFix: true }),

        doc: doc,

        win: doc.defaultView|| doc.parentWindow
      });
    }

    Worker.prototype.exec = function(task, done) {
      task.run.call(this.win, this.doc);
      delete task.run;
      done();
    };

    // The method on the window object used for 'eval'
    var EVAL = globals.execScript ? 'execScript' : 'eval';

    Worker.prototype.script_inline = function(task, done) {
      try {
        this.win[EVAL](task.expr, task.lang);
      } catch(e) {
        this.options.error(e);
      }
      done();
    };

    Worker.prototype.script_remote = function(task, done) {
      var _this = this;
      var s = this.doc.createElement('script');
      var props = {

        src: task.src,

        async: true,

        // Handlers
        onload: function() {
          s = s.onload = s.onreadystatechange = s.onerror = null;
          done();
        },
        onreadystatechange: function() {
          if(/^(loaded|complete)$/.test( s.readyState )) {
            s.onload();
          }
        },
        onerror: function() {
          _this.options.error({ message: 'remote script failed ' + task.src });
          s.onload();
        }
      };

      // Set attributes
      eachKey(task.tok.attrs, function(name, value) {
        if(!props.hasOwnProperty(name)) {
          s.setAttribute(name, value);
        }
      });

      set(s, props);

      this.root.appendChild(s);
    };


    // Write task
    Worker.prototype.write = function(task, done, flow) {

      this.parser.append(task.html);

      var tok, tokens = [];

      // stop if we see a script token
      while((tok = this.parser.readToken()) != null && !isScript(tok)) {
        tokens.push(tok);
      }

      // Write out this chunk of tokens
      var chunk = this.stream.write(tokens);

      if(DEBUG_CHUNK) {
        task.chunk = chunk;
      }

      if(tok) {
        this.onScriptToken(tok, flow);
      }

      done();

    };

    // We encountered a script token while writing.
    Worker.prototype.onScriptToken = function(tok, flow) {

      // Stash remainder of parser for during this script.
      var remainder = this.parser.clear();
      
      var language = tok.attrs.LANGUAGE || tok.attrs.language;
      
      // Subtask: Run this script.
      var src = tok.attrs.src || tok.attrs.SRC;
      flow.subtask( src ?
        // Remote script: cannot be inlined.
        { type: 'script_remote', src: src, tok: tok } :

        // Inline script.
        { type: 'script_inline', lang: language, inlinable: true, tok: tok, expr: (tok.content)
            // remove CDATA and HTML comments
            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
            .replace(/<!--([\s\S]*?)-->/g, "$1")
        }
      );

      // Subtask: Write remainder behind script.
      if(remainder) {
        flow.subtask({ type: 'write', html: remainder, inlinable: true });
      }
    };

    return Worker;

  }());

  // ## Class Flow
  // Controls the flow of a tree of tasks with subtasks
  // Subtasks of a task are those tasks that are added while that task is the active task.
  // 1. task _A_ and all its "subtasks" are done before any tasks following _A_ (in tree order)
  // 2. A task is inlined if it is inlinable and there are no deferred tasks (because of point #1). Else it is defered.

  // Special task properties:

  // * type
  // * start
  // * complete
  var Flow = (function() {

    // param worker[task.type](task, done): an object with async callbacks to execute each task type.
    function Flow(worker, options) {

      var deferred = [];

      set(this, {

        // The worker performs the tasks.
        worker: worker,

        options: defaults(options, {
          taskAdd: doNothing,
          taskStart: doNothing,
          taskDone: doNothing
        }),

        // The active (currently executing) task.
        active: null,

        // The list of deferred tasks.
        // Only done when idle.
        deferred: deferred,

        // The active task's deferred decendant subtasks.
        _deferred: deferred
      });
    }

    // Add a "root" task.
    Flow.prototype.task = function(task, done) {
      this.options.taskAdd(task);

      this.deferred.push(task);

      if(done) {
        this.deferred.push(done);
      }

      this.nextIfIdle();

      return this;
    };

    // Add a subtask of active task.
    Flow.prototype.subtask = function(child) {

      this.options.taskAdd(child);

      if(child.inlinable && !this._deferred.length) {
        // Inline this child.
        this.startTask(child);
      } else {
        // Defer this child.
        this._deferred.push(child);
      }
    };

    // Start a task.
    Flow.prototype.startTask = function(task) {
      var _this = this;

      if(this.stopRequested) {
        return this._deferred.unshift(task);
      }

      // Functions are light-weight tasks.
      if(isFunction(task)) {
        task.call(this);
        return this.nextIfIdle();
      }

      // Stash the active task and queue
      var stash = { active: this.active, _deferred: this._deferred };

      // Collect deferred subtasks for this task.
      set(this, { active: task, _deferred: [] });

      this.options.taskStart(task);

      // Worker's method is passed the task, done callback, and this flow.
      this.worker[task.type](task, function() {
        _this.doneTask(stash);
      }, this);
    };

    // Called when active task is done.
    Flow.prototype.doneTask = function(stash) {

      this.options.taskDone(this.active);

      // Prepend deferred to stashed deferred in-place.
      // When idle, this.deferred will hold all _deferred in the right order.
      [].unshift.apply(stash._deferred, this._deferred);

      // Restore stashed state.
      set(this, stash);

      // Are we are waiting to stop?
      if( this.onStop && !this.active ) {
        this.onStop(); delete this.onStop;
      }

      this.nextIfIdle();
    };

    // Run the next deferred task if no other task is running.
    Flow.prototype.nextIfIdle = function() {
      // !this.active <==> (this._deferred === this.deferred)
      var task = !this.active && this.deferred.shift();

      if(task) {
        this.startTask(task);
      }
    };

    // Stop this flow
    Flow.prototype.stop = function(onStop) {
      // Callback when flow has actually stopped.
      onStop = onStop || doNothing;
      this.stopRequested = true;

      if(!this.active) {
        // We are ready to stop now.
        onStop();
      } else {
        // We will stop when next we are idle.
        this.onStop = onStop;
      }
    };

    // Start this flow.
    Flow.prototype.start = function() {
      this.stopRequested = false;
      delete this.onStop;

      this.nextIfIdle();
      return this;
    };

    return Flow;

  }());


  // ## Class Tracer (Debugging)
  // Traces the relationships between tasks.
  var Tracer = (function() {

    function Tracer() {
      set(this, {
        // All tasks by id.
        tasks: [],
        // Tasks with no parent.
        roots: [],
        // The active task.
        active: null
      });
    }

    Tracer.prototype.taskAdd = function(task) {
      task.id = this.tasks.length;
      this.tasks.push(task);

      task.state = 'waiting';

      if(this.active) {
        task.cause = this.active.id;
        (this.active.effects = this.active.effects || []).push(task.id);
      }

      return task;
    };

    Tracer.prototype.taskStart = function(task) {

      var parent = this.active;

      if(parent) {

        task.parent = parent.id;
        (parent.childIds = parent.childIds || []).push(task.id);
        (parent.children = parent.children || []).push(task);

      } else {

        this.roots.push(task);
      }

      task.state = 'started';

      this.active = task;

    };

    Tracer.prototype.taskDone = function(task) {

      task.state = 'done';

      this.active = task.parent != null ? this.tasks[task.parent] : null;

    };

    return Tracer;
  }());





  // Public-facing interface and queuing
  var postscribe = (function() {

    function start(el, rootTask, options, done) {

      options = defaults(options, {
        afterWrite: doNothing,
        done: doNothing
      });
      // Create the flow.

      var worker = new Worker(el, options);

      var flow = new Flow(worker, DEBUG && new Tracer());

      flow.name = options.name;

      postscribe.writers[flow.name] = flow;

      // Override document.write.

      var doc = el.ownerDocument;

      var stash = { write: doc.write, writeln: doc.writeln };

      function write(str) {

        flow.subtask({ type: 'write', html: str, inlinable: true });

        options.afterWrite(str);

      }

      set(doc, { write: write, writeln: function(str) { write(str + '\n'); } });

      // Start the flow

      flow.task(rootTask, function() {

        // restore document.write
        set(doc, stash);

        options.done();

        done();

      });

      return flow;

    }

    var queue = new Flow({
      rootTask: function(args, done) {
        args.push(done);
        args.flow = start.apply(null, args);
      }
    });

    function postscribe(el, html, options) {

      el =
        // id selector
        (/^#/).test(el) ? globals.document.getElementById(el.substr(1)) :
        // jquery object. TODO: loop over all elements.
        el.jquery ? el[0] : el;

      options = options || {};

      var rootTask = isFunction(html) ?
        { type: 'exec', run: html } :
        { type: 'write', html: html };

      var args = set([el, rootTask, options], { type: 'rootTask' });

      queue.task(args);

      return (el.postscribe = {
        stop: function() {
          if(args.flow) {
            args.flow.stop();
          } else {
            // Set a root task that does nothing.
            args[1] = { type: "exec", run: doNothing };
          }
        }
      });
    }

    return set(postscribe, {

      writers: {},

      queue: queue,

      // Expose internal classes.
      Worker: Worker,
      Flow: Flow,
      Tracer: Tracer,
      WriteStream: WriteStream,

      json: function() {
        var ret = {};
        eachKey(this.writers, function(name, writer) {
          ret[name] = writer.options.roots;
        });
        return ret;
      }
    });

  }());


  // export postscribe
  globals.postscribe = postscribe;

}());
