//     postscribe.js 1.0.5
//     (c) Copyright 2012 to the present, Krux
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

    function WriteStream(root, options) {
      var doc = root.ownerDocument;

      set(this, {
        root: root,

        options: options,

        doc: doc,

        parser: globals.htmlParser('', { autoFix: true }),

        // Actual elements by id.
        actuals: [root],

        // Embodies the "structure" of what's been written so far, devoid of attributes.
        proxyHistory: '',

        // Create a proxy of the root element.
        proxyRoot: doc.createElement(root.nodeName)
      });

      data(this.proxyRoot, 'proxyof', 0);

    }


    WriteStream.prototype.write = function(html) {
      this.parser.append(html);

      var tok, tokens = [];

      // stop if we see a script token
      while((tok = this.parser.readToken()) != null && !isScript(tok)) {
        tokens.push(tok);
      }

      var chunk = this.writeStaticTokens(tokens);

      if(tok) {
        this.handleScriptToken(tok);
      }

      return {
        chunk: chunk,
        script: tok
      };
    };


    // ## Contiguous non-script tokens (a chunk)
    WriteStream.prototype.writeStaticTokens = function(tokens) {

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
          proxy = [];

      each(tokens, function(tok) {

        raw.push(tok.text);

        if(tok.attrs) { // tok.attrs <==> startTag or atomicTag or cursor
          // Ignore noscript tags. They are atomic, so we don't have to worry about children.
          if(!(/^noscript$/i).test(tok.tagName)) {
            var id = nextId++;

            // Actual: inject id attribute: replace '>' at end of start tag with id attribute + '>'
            actual.push(
              tok.text.replace(/(\/?>)/, ' '+BASEATTR+'id='+id+' $1')
            );

            // Don't proxy scripts: they have no bearing on DOM structure.
            if(tok.attrs.id !== "ps-script") {
              // Proxy: strip all attributes and inject proxyof attribute
              proxy.push(
                // ignore atomic tags (e.g., style): they have no "structural" effect
                tok.type === 'atomicTag' ? '' :
                  '<'+tok.tagName+' '+BASEATTR+'proxyof='+id+(tok.unary ? '/>' : '>')
              );
            }
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

    WriteStream.prototype.handleScriptToken = function(tok) {
      var remainder = this.parser.clear();
      tok.src = tok.attrs.src || tok.attrs.SRC;
      if(tok.src) {
        var done = this.options.onScript(tok);
        this.writeScriptToken(tok, done);
        if(remainder) {
          this.options.onScriptRemainder(remainder);
        }
      } else {
        this.writeScriptToken(tok, doNothing);
        this.write(remainder);
      }
    };

    // ### Script tokens

    WriteStream.prototype.writeScriptToken = function(tok, done) {
      var el = this.buildScript(tok);

      if(tok.src) {
        // Fix for attribute "SRC" (capitalized). IE does not recognize it.
        el.src = tok.src;
        this.setLoadHandlers(el, done);
      }

      try {
        this.insertScript(el);
        if(!tok.src) {
          done();
        }
      } catch(e) {
        done(e);
      }

    };


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


    // Insert element into DOM where cursor is
    WriteStream.prototype.insertScript = function(el) {

      this.write('<span id="ps-script"/>');

      var cursor = this.doc.getElementById("ps-script");

      var parent = cursor && cursor.parentNode;
      if(parent) {
        parent.removeChild(cursor);
        parent.appendChild(el);
      } else {
        throw "Could not insert script";
      }
    };

    WriteStream.prototype.setLoadHandlers = function(el, done) {
      // Setup handlers
      function cleanup(e) {
        el = el.onload = el.onreadystatechange = el.onerror = null;
        done(e);
      }

      // Set handlers
      set(el, {
        onload: function() { cleanup(); },

        onreadystatechange: function() {
          if(/^(loaded|complete)$/.test( el.readyState )) {
            cleanup();
          }
        },
        onerror: function() {
          done({ message: 'remote script failed ' + task.src });
        }
      });
    };

    return WriteStream;

  }());

  // # Class Worker
  // Perform tasks in the context of an element.
  var Worker = (function() {

    function Worker(el, options) {
      // Default options

      var _this = this;
      set(this, {

        options: defaults(options, { error: doNothing }),


        stream: new WriteStream(el, {
          onScript: function(tok) {
           return _this.onScriptStart(tok);
          },
          onScriptRemainder: function(remainder) {
            _this.onScriptRemainder(remainder);
          }
        })

      });
    }

    Worker.prototype.exec = function(task, done) {
      task.run.call(this.win, this.doc);
      delete task.run;
      done();
    };

    Worker.prototype.script = function(task, done) {
      this.doneScript = done;
    };

    Worker.prototype.onScriptStart = function(tok) {
      if(tok.src) {
        this.flow.subtask({ type: 'script', inlinable: !tok.src, tok: tok });
      }
      var _this = this;
      return tok.src ? function(e) {
        _this.onScriptDone(e);
      } : doNothing;
    };

    Worker.prototype.onScriptRemainder = function(remainder) {
      this.flow.subtask({ type: 'write', inlinable: true, html: remainder });
    };

    Worker.prototype.onScriptDone = function(e) {
      if(e) {
        this.options.error(e);
      }
      this.doneScript();
    };

    // Write task
    Worker.prototype.write = function(task, done, flow) {
      this.flow = flow;

      var result = this.stream.write(task.html);


      if(DEBUG_CHUNK) {
        task.result = result;
      } else {
        task.chunk = result.chunk && result.chunk.raw;
      }


      done();

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
    var nextId = 0;

    function start(el, rootTask, options, done) {

      options = defaults(options, {
        beforeWrite: null,
        afterWrite: doNothing,
        done: doNothing
      });
      // Create the flow.

      var worker = new Worker(el, options);

      var flow = new Flow(worker, DEBUG && new Tracer());

      flow.id = nextId++;

      flow.name = options.name || flow.id;

      postscribe.flows[flow.name] = flow;

      // Override document.write.

      var doc = el.ownerDocument;

      var stash = { write: doc.write, writeln: doc.writeln };

      function write(str) {
        if(options.beforeWrite) {
          str = options.beforeWrite(str);
        }

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

      flows: {},

      queue: queue,

      // Expose internal classes.
      Worker: Worker,
      Flow: Flow,
      Tracer: Tracer,
      WriteStream: WriteStream,

      json: function() {
        var ret = {};
        eachKey(this.flows, function(name, flow) {
          ret[name] = flow.options.roots;
        });
        return ret;
      }
    });

  }());


  // export postscribe
  globals.postscribe = postscribe;

}());
