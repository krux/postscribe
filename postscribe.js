
(function() {
  var globals = this;

  // Helpers
  var isFunction = function(x) {
    return {}.toString.call(x) == '[object Function]';
  };

  var isString = function(x) {
    return {}.toString.call(x) == '[object String]';
  };

  var each = function(arr, fn, me) {
    var i, len = (arr && arr.length) || 0;
    for(i = 0; i < len; i++) {
      fn.call(me, arr[i], i);
    }
  };

  var eachKey = function(obj, fn, me) {
    if(obj) {
      var key;
      for(key in obj) {
        if(obj.hasOwnProperty(key)) {
          fn.call(me, key, obj[key]);
        }
      }
    }
  };

  var toArray = function(obj) {
    var i;
    try {
      return Array.prototype.slice.call(obj);
    } catch(e) {
      var ret = [];
      each(obj, function(val) {
        ret.push(val);
      });
      return ret;
    }
  };

  var bindMethod = function(obj, name) {
    var method = obj[name];
    obj[name] = function boundMethod() {
      method.apply(obj, arguments);
    };
    obj[name].actual = method;
  };

  var chainPrototype = function(Parent, Child) {
    var Proto = function(){};
    Proto.prototype = Parent.prototype;
    Child.prototype = new Proto();
    Child.prototype.constructor = Child;
  };

  var isScript = function(tok) {
    return (/^script$/i).test(tok.tagName);
  };

  var log = function() {
    /*
    var console = this.console;
    if(console && console.log) {
      try {
        console.log.apply(console, arguments);
      } catch(e) {
        console.log(toArray(arguments).join(' '));
      }
    }
    */
  };

  var clip = function(str) {
    var limit = 40;
    return str.substr(0, limit).replace(/\n\s*/g, ' ') +
      (str.length > limit ? '...' : '');
  };

  var remove = function(el) {
    if(el.parentNode) {
      el.parentNode.removeChild(el);
    }
    return el;
  };

  var appendChild = function(parent, child) {
    //parent.insertBefore(remove(child), null);
    parent.appendChild(remove(child));
  };

  // Class Writer

  var Writer = (function(){


    var BASEATTR = 'data-ps-';

    // Class Chunk

    var Chunk = (function() {

      function Chunk(tokens, baseId) {
        var i, tok;

        this.tokens = tokens;
        this.baseId = this.nextId = baseId;
        this.tags = [];
        this.raw = "";
        this._html = [];

        each(tokens, function(tok) {
          this.raw += tok.text;
          this[tok.type](tok);
        }, this);
        delete this.nextId;

        this.html = this._html.join('');

        delete this._html;
      }

      Chunk.prototype.startTag = function(tok) {
        var id = this.nextId++;
        this.tags.push(tok);
        this._html.push(tok.text.replace(/(\/?>)/, ' '+BASEATTR+'id='+id+' $1'));
      };


      Chunk.prototype.atomicTag = function(tok) {
        if(isScript(tok)) {
          throw 'Cannot handle scripts here';

        } else if(/^noscript$/i.test(tok.tagName)) {
          // no point in writing noscript tags. Do nothing
          return;
        } else {
          // style element, for example
          // this just appends the entire tag
          this.startTag(tok);
        }
      };

      Chunk.prototype.append = function (tok) {
        this._html.push(tok.text);
      };

      Chunk.prototype.comment = Chunk.prototype.append;

      Chunk.prototype.endTag = Chunk.prototype.append;

      Chunk.prototype.chars = Chunk.prototype.append;

      return Chunk;
    }());


    // Class ProxyChunk

    var ProxyChunk = (function() {

      function ProxyChunk(tokens, baseId) {
        Chunk.apply(this, arguments);
      }

      chainPrototype(Chunk, ProxyChunk);

      ProxyChunk.prototype.startTag = function(tok) {
        var id = this.nextId++;

        // No attributes
        this._html.push('<'+tok.tagName+' '+BASEATTR+'proxyof='+id+
          (tok.unary ? '/>' : '>'));
      };

      // No atomic nodes
      ProxyChunk.prototype.atomicTag = function(tok) {};
      // No text nodes
      ProxyChunk.prototype.chars = function(tok) {};
      // No comment nodes
      ProxyChunk.prototype.comment = function(tok) {};

      return ProxyChunk;
    }());




    var data = function(el, name, value) {
      var attr = BASEATTR + name;
      if(arguments.length === 2) {
        // Get
        var val = el.getAttribute(attr);
        // IE 8 returns a number if it's a number
        return val == null ? val : String(val);
      } else if( value != null && value !== '') {
        // Set
        el.setAttribute(attr, value);
        return value;
      } else {
        // Remove
        el.removeAttribute(attr);
      }
    };

    var isProxy = function(el) {
      return el && el.nodeType === 1 && !!data(el, 'proxyof');
    };

    var isActual = function(el) {
      return el && (el.nodeType !== 1 || !isProxy(el));
    };

    function Writer(root, name) {
      this.root = root;
      this.name = name;

      this.doc = root.ownerDocument;

      this.chunks = [];

      this.chunk = null;

      this.actuals = [];

      this.rootProxy = this.doc.createElement(root.nodeName);
      data(this.rootProxy, 'proxyof', 0);

      this.proxyHtml = '';

      // register root element
      data(root, 'id', 0);
      this.registerElement(root);

    }

    Writer.prototype.registerElement = function(el) {
      var id = parseInt(data(el, 'id'), 10);

      this.actuals.push({
        node: el,
        token: this.chunk && this.chunk.tags[id - this.chunk.baseId]
      });

      data(el, 'id', null);
    };

    Writer.prototype.write = function(tokens) {
      var baseId = this.actuals.length;

      // Create a chunk based on these tokens
      var chunk = this.chunk = new Chunk(tokens, baseId);

      if(!chunk.html) {
        // a noscript that got ignored, for example
        return chunk;
      }

      this.rootProxy.innerHTML = this.proxyHtml + chunk.html;

      // for debugging
      chunk.fullHtml = this.proxyHtml + chunk.html;
      chunk.proxyInnerHTML = this.rootProxy.innerHTML;

      this.walkNodes();

      // for debugging
      chunk.rootInnerHTML = this.root.innerHTML;

      // Add the proxyHtml for this chunk.
      this.proxyHtml += new ProxyChunk(tokens, baseId).html;

      this.chunk = null;

      return chunk;
    };

    Writer.prototype.actual = function(node) {
      return isActual(node) ? node :
             isProxy(node) && this.actuals[
              data(node, 'proxyof')
             ].node;
    };

    Writer.prototype.walkNodes = function() {
      var stack = [this.rootProxy];
      var node = stack.shift();
      var lastId = -1;
      var id;
      // use shift/unshift so that children are walked in document order

      while(node) {

        if(isActual(node)) {
          if(node.nodeType === 1) { // Element
            this.registerElement(node);
          }

          var parent = node.parentNode;
          if(isProxy(parent)) {
            appendChild(this.actual(parent), node);
          }
        }

        // prepend childNodes to stack
        [].unshift.apply(stack, toArray(node.childNodes));
        node = stack.shift();
      }
    };

    Writer.prototype.log = function() {
      /*
      var args = ['wr'];
      if(this.name) {
        args.push(this.name);
      }
      [].push.apply(args, arguments);

      log.apply(null, args);
      */
    };



    return Writer;

  }());


  // Class WriteContext

  var WriteContext = (function(){

    // WriteContext brings together a writer, a parser and a writeQueue

    function WriteContext(el, options) {

      this.options = options;

      this.name = options.name;

      this.root = el;

      this.writer = new Writer(el, options.name);

      this.parser = globals.htmlParser('', { autoFix: true });

      this.writeQueue = [[]]; // stack of queues

      // those tasks with no parent
      this.rootTasks = [];

      // tasks by id
      this.tasks = [];

      // The currently running script
      this.current = null;

      // The deferred script
      this.deferred = null;

      // initialize document and window
      var doc = this.doc = el.ownerDocument;
      var win = this.win = doc.defaultView || doc.parentWindow;

      // Creates win.eval in IE. I can't remember where I saw this trick.
      if( win.execScript && !win['eval'] ) {
        win.execScript('0');
      }

      bindMethod(this, 'write');
      bindMethod(this, 'callScriptDone');

    }

    WriteContext.prototype.kill = function() {
      this.killed = true;
      if(this.current && !this.current.async) {
        this.options.done();
      }
    };

    WriteContext.prototype.error = function(e) {
      postscribe.logs.push('ERROR '+ this.currentToString()+ ' ' + e.message);
      this.current.error = e;
      if(this.options.error) {
        this.options.error(e);
      }
    };

    WriteContext.prototype.currentToString = function() {
      var task = this.current;
      return this.name + '/' + task.type + task.id;
    };

    WriteContext.prototype.beginTask = function(task) {

      if(this.current) {
        task.parent = this.current.id;
        (this.current.childIds = this.current.childIds || []).push(task.id);
        (this.current.children = this.current.children || []).push(task);
      } else {
        this.rootTasks.push(task);
      }

      this.current = task;
      task.state = 'begun';

      // stash writes
      this.writeQueue.unshift([]);

      postscribe.logs.push('beg ' + this.currentToString());
    };

    WriteContext.prototype.endTask = function(task) {
      task.state = 'done';

      if(this.killed && task.async) {
        return this.options.done();
      }


      if(task !== this.current) {
        this.error({ message: 'malformed task stack', expected: this.current, actual: task});
      }

      postscribe.logs.push('end ' + this.currentToString());
      this.current = task.parent != null && this.tasks[task.parent];

      // pop and apply writes
      var newWrites = this.writeQueue.shift();

      // prepend newWrites to queue
      [].unshift.apply(this.writeQueue[0], newWrites);

      this.checkWriteQueue();

      if(!this.current && this.deferred) {
        // execute the deferred script
        var deferred = this.deferred;
        this.deferred = null;
        this.callScript(deferred);
      }
    };

    WriteContext.prototype.initTask = function(type) {
      var task = {type: type};
      task.id = this.tasks.length;
      this.tasks.push(task);

      if(this.current) {
        task.cause = this.current.id;
        (this.current.effects = this.current.effects || []).push(task.id);
      }
      return task;
    };

    // Write Handling

    // Public
    WriteContext.prototype.write = function(str) {
      this.firstWrite = this.firstWrite || str;
      this.addWrite( str );
    };

    // value can be a string of a function
    WriteContext.prototype.addWrite = function(value) {

      var wr = this.initTask('write');
      wr.value = value;

      if(isFunction(value)) {
        wr.isFunction = value.name || true;
      }

      this.writeQueue[0].push(wr);

      if(this.deferred) {
        wr.deferredBy = this.deferred.id;
      }

      this.checkWriteQueue();
    };

    WriteContext.prototype.checkWriteQueue = function() {
      if(this.killed) {
        return;
      }
      if(!this.deferred) {
        var wr = this.writeQueue[0].shift();
        if(wr) {

          this.beginTask(wr);

          if(isFunction(wr.value)) {
            // call function - must be synchronous
            wr.value.call(this);
            delete wr.value;
          } else {
            // string
            this.doWrite(wr);
          }

          this.endTask(wr);
        }
      }
    };

    WriteContext.prototype.doWrite = function(wr) {

      this.parser.append(wr.value);

      var tokens = [];
      var tok = this.parser.readToken();
      while(tok && !isScript(tok)) {
        // simplify memory and logs
        delete tok.escapedAttrs;
        tokens.push(tok);
        tok = this.parser.readToken();
      }

      if(tokens.length) {
        // Write out this chunk of tokens
        wr.chunk = this.writer.write(tokens).raw;
      }

      var rest = this.parser.rest();

      if(tok) {
        delete tok.escapedAttrs;

        // clear parser before doing anything else.
        this.parser.clear();

        // handle script token
        // extract expression from content
        var expr = (tok.content || '')
          // remove CDATA
          .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
          // remove HTML comments
          .replace(/<!--([\s\S]*?)-->/g, "$1");

        this.addScript({
          expr: expr,
          src: tok.attrs.src || tok.attrs.SRC
        });

        if(rest) {
          // write the rest later.
          this.addWrite(rest);
        }

      } else if (rest) {
        // log the remainder
        //sideEffect(wr, { logs: ['remainder', clip(rest), {rest: rest}]});
        wr.remainder = rest;
      }

    };

    // Public
    WriteContext.prototype.run = function() {
      // TODO: other options like remote script or js expression!

      if(this.killed) {
        if(this.options.done) {
          this.options.done();
        }
        return;
      }

      var this_ = this;
      var options = this.options;
      var script = {

        run: function rootScript() {

          options.run.call(this_);

          this_.addWrite(function() {
            if(options.done) {
              this_.addWrite(options.done);
            }
          });
        }
      };

      this.addScript(script);
    };

    WriteContext.prototype.addScript = function(s) {

      // get "type" to be the first attribute
      var script = this.initTask('script');
      eachKey(s, function(key, val) {
        script[key] = val;
      });

      if(script.run) {

        script.isFunction = script.run.name || true;

      } else if (script.src) {
        // Remote

        script.run = function(done) {
          this.loadRemote(script.src, done);
        };

      } else if (script.expr) {
        // Inline eval

        script.run = function() {
          this._eval(script.expr);
        };

      }


      // function.length is number of arguments
      script.async = script.run.length === 1;
      if(script.async) {
        if(this.deferred) {
          throw 'double deferral'; // sanity
        }
        // defer until current script stack has exited.
        this.deferred = script;
      } else {
        // run it now
        this.callScript(script);
      }

    };

    WriteContext.prototype.callScript = function(script) {
      if(this.killed) {
        return;
      }

      this.beginTask(script);

      var this_ = this;
      var done = function endTask() {
        this_.endTask(script);
        // ensure this only gets called once.
        done = function () {};
      };


      var run = function() {
        var fn = script.run;
        delete script.run;
        if(script.async) {
          fn.call(this_, done);
        } else {
          fn.call(this_);
          done();
        }
      };

      if(location.href.match(/\bnotry=1/)) {
        run();
      } else {
        try {
          run();
        } catch(e) {
          this.error({message: e.message});
          done();
        }
      }
    };

    // Script Handling

    WriteContext.prototype._eval = function(expr) {
      this.win['eval'](expr);
    };

    WriteContext.prototype.loadRemote = function(src, done) {
      var s = this.doc.createElement('script');
      var this_ = this;

      s.src = src;

      var cleanup = function() {
        s = s.onload = s.onreadystatechange = s.onerror = null;
        done();
      };
      s.onload = s.onreadystatechange = function() {
        if ( !s.readyState || /^(loaded|complete)$/.test( s.readyState ) ) {
          cleanup();
        }
      };
      s.onerror = function() {
        this_.error({message: 'remote script failed ' + src, url: src});
        cleanup();
      };
      appendChild(this.writer.root.parentNode, s);
    };


    return WriteContext;


  }());

  // Public-facing interface and queuing
  var postscribe = (function() {

    var queue = [];

    var next = function() {
      var ctx;
      if(postscribe.current) {
        // cleanup
        ctx = postscribe.current;
        ctx.doc.write = ctx._write;
        ctx.doc.writeln = ctx._writeln;
      }
      postscribe.current = queue.shift();
      if(postscribe.current) {
        ctx = postscribe.current;
        if(ctx.options.before) {
          ctx.options.before();
        }

        ctx._write = ctx.doc.write;
        ctx._writeln = ctx.doc.writeln;

        ctx.doc.write = ctx.write;
        ctx.doc.writeln = function(str) {
          ctx.write(str+'\n');
        };

        ctx._run();
      }
    };

    function postscribe(el, options) {
      // extract node from jquery if necessary
      var root = el.jquery ? el[0] : el;

      // implement queueing
      var oldDone = options.done || function(){};
      options.done = function startNextContext() {
        oldDone();
        next();
      };


      var ctx = new WriteContext(root, options);

      root.postscribe = ctx;

      postscribe.instances[ctx.name] = ctx;

      ctx._run = ctx.run;
      ctx.run = function() {
        queue.push(ctx);
        if(!postscribe.current) {
          next();
        }
      };

      // TODO: move options into "run" method
      return ctx;
    }

    postscribe.instances = {};

    postscribe.json = function() {
      var ret = {};
      eachKey(this.instances, function(name, ctx) {
        ret[name] = {
          tasks: ctx.rootTasks,
          innerHTML: ctx.root.innerHTML
        };
      });
      ret.logs = postscribe.logs;
      return ret;
    };

    postscribe.logs = [];
    postscribe.queue = queue;

    postscribe.WriteContext = WriteContext;

    return postscribe;
  }());

  // export postscribe
  this.postscribe = postscribe;

}());
