
// final innerHTML behaves like buffered innerHTML and not like streamed document.write
// That is acceptable.
var GENERATE_EXPECTED = !window.expectedBehavior;

var testOptions = {};

var defaultOptions = {
};

var innerHtml = function(el) {
  return el.innerHTML.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '');
}
var nativeBehavior = {};

if(!window.console) {
  window.console = {log: function(){}};
}
// reverse the first two arguments of equal
var qunitEqual = equal;

equal = function(expected, actual, message) {
  return qunitEqual(actual, expected, message);
};

var getDoc = function(iframe) {
  return iframe.contentWindow.document;
};

var IFrame = function(id) {
  var ifr = document.createElement('iframe');

  ifr.setAttribute('id', id);

  // append it to dom so we can get the document
  document.body.appendChild(ifr);
  ifr.doc = getDoc(ifr);

  // write a content div
  ifr.doc.write('<html><body><h3>'+id+'</h3>');

  ifr.doc._write = ifr.doc.write;
  ifr.doc._writeln = ifr.doc.writeln;

  ifr.doc.write = function(str) {
    ifr.doc._write(str);
  }

  ifr.doc.writeln = function(str) {
    ifr.doc.write(str+'\n');
  }

  ifr.doc.writeInline = function(js) {
    this.write('<script>'+js+'</script>');
  };

  ifr.doc.writeRemote = function(url) {
    this.write('<script src="'+url+'"></script>');
  };

  ifr.doc.callbackId = 0;
  ifr.doc.writeCallback = function(fn, msg) {
    ifr.doc.callbackId++;
    var cbName = 'cb_'+ifr.doc.callbackId;
    ifr.contentWindow[cbName] = fn;
    ifr.doc.write('<script class="test_cb">'+cbName+'();//'+msg+'</script>');
  };

  return ifr;
};

var PauseMonitor = function(done) {
  var timeout;
  var self = {

    contexts: [],

    // ctx's interface: resume method + paused boolean attribute.
    add: function(ctx) {
      self.contexts.push(ctx);

      // override ctx's resume method
      var resume = ctx.resume;
      ctx.resume = function() {
        // call ctx's old resume method
        resume.apply(ctx, arguments);
        self.checkDone();
      };
    },


    checkDone: function () {
      clearTimeout(timeout);
      // check if we're done on next tick.
      timeout = setTimeout(function() {
        for(var i = 0, ctx; ctx = self.contexts[i]; i++) {
          if(ctx.paused) {
            return;
          }
        }
        console.log('=== all contexts are done ===');
        done();
        done = null;
      }, 0);
    }

  };

  return self;
};


// a tag is a function that takes a document context
var execute = function(name, tags, options) {
  random.reset();

  console.log('\n\ntest start '+name);
  var tag, i;
  for(var i = 0, tag; tag = tags[i]; i++) {
    tag.id = 'tag'+i;
  }

  var ifr, mode, pauseMonitor;

  var Context = {
    common: function(tag) {
      var doc = getDoc(ifr);

      var self = tag[mode+'Ctx'] = {

        tag: tag,

        mode: mode,

        doc: doc,

        div: doc.getElementById(tag.id),

        written: '',

        pause: function() {
          console.log('ctx paused');
          self.paused = true;
        },

        resume: function() {
          console.log('ctx resumed');
          self.paused = false;
        },

        onFinished: function() {
          self.eq(innerHtml(self.div), tag.id+':Final InnerHtml');
          console.log(tag.id+' finished');
        },

        render: function renderTest() {
          console.log(tag.id+' starting');
          self.tag.render(self);
          self.pause();
          self.writeCallback(function() {
            self.onFinished();
            self.resume();
          }, 'Rendering Complete');
        },

        compareInnerHtml: function(str) {
          self.eqPrefix(innerHtml(self.div), tag.id+':'+str);
        }

      };

      var delegateMethod = function(method) {
        self[method] = function() {
          return doc[method].apply(doc, arguments);
        };
      };
      var method, methods = 'write writeln writeInline writeRemote writeCallback'.split(' ');
      while(method = methods.pop()) {
        delegateMethod(method);
      }

      return self;
    },

    native: function(tag){

      var self = Context.common(tag);

      self.calls = [];

      self.eq = function(val, msg) {
        self.calls.push(arguments);
      };

      self.eqPrefix = function(val, msg) {
        self.calls.push(arguments);
      };

      self.expect = function(){
        // do nothing
      };

      var parser = htmlParser('', {
        autoFix: true
      });

      self.doc.write = function(str) {
        console.log('native docwrite', str);

        if(parser) {
          parser.append(str);
          str = '';
          for(var tok; tok = parser.readToken();) {
            str += tok.text;
          }
        }


        str = str.replace(/\.js/g, '.js?'+Math.random());

        self.written = self.written + str;

        if(options.useInnerHtml) {
          self.div.innerHTML = self.written;
        } else {
          self.doc._write(str);
        }
        self.compareInnerHtml(str);
      };

      return self;
    },


    writer: function(tag){

      var self = Context.common(tag);
      var work = self.doc.createElement('div');

      var expectCalls;

      if(!GENERATE_EXPECTED && options.useExpected) {  //$.browser.msie || $.browser.mozilla && parseFloat($.browser.version) < 2 ) {
        expectCalls = expectedBehavior['test '+name][tag.id].calls;
      } else {
        expectCalls = [].slice.call(tag.nativeCtx.calls);
      }

      self.expect = function(expects) {

      };

      self.eq = function(val, msg) {
        var args = expectCalls.shift();

        if(args && options.useExpected) {
          // run it through innerHTML to get rid of browser inconsistencies
          work.innerHTML = args[0];
          args[0] = work.innerHTML;
        }

        if(!args) {
          args = ['args was null', 'args was null'];
        } else if (args[1] !== msg) {
          msg = 'mismatch: 1:' + args[1] + ' 2:'+msg;
        }

        if(args[0] !== val) {
          console.log('\nTest Fail', msg);
        }

        equal(args[0], val, msg);
      };

      // writer should have at least what native has.
      self.eqPrefix = function(val, msg) {
        var args = expectCalls.shift();

        if(args && options.useExpected) {
          // run it through innerHTML to get rid of browser inconsistencies
          work.innerHTML = args[0];
          args[0] = work.innerHTML;
        }

        if(!args) {
          args = ['args was null', 'args was null'];
        } else if (args[1] !== msg) {
          msg = 'mismatch: 1:' + args[1] + ' 2:'+msg;
        }

        if(args[0] !== val) {
          console.log('\nTest Fail', msg);
        }

        if(val.indexOf(args[0]) !== 0) {
          equal(args[0], val, msg);
        } else {
          ok(true, msg);
        }
      };


      var renderImpl = self.render;

      self.render = function() {
        self.writer = postscribe(self.div, function() {
            self.doc.currentTag = tag;
            renderImpl.call(this);
          }, {
          name: tag.id,
          afterWrite: function(str) {
            self.written += str;
            self.compareInnerHtml(str);
          }
        });
      };


      return self;
    }
  };

  var renderTag = function(tag) {
    var ctx = Context[mode](tag, ifr.doc);
    pauseMonitor.add(ctx);
    ctx.render();
  };

  // pause the qunit test
  stop();

  var queue = [

    function NATIVE_MODE(done) {
      if(!GENERATE_EXPECTED && options.useExpected) {
        done();
        return;
      }

      console.log('\ntest native');

      ifr = IFrame('[EXPECTED]'+name);

      // render tags inline
      mode = 'native';

      pauseMonitor = PauseMonitor(done);

      ifr.contentWindow.renderTag = function(i) {
        renderTag(tags[i]);
      };

      for(i = 0; tag = tags[i]; i++) {

        ifr.doc._write('<div class=tag id='+tag.id+'>');

        // render inline
        if(options.async) {
          ifr.doc._write('<script>renderTag('+i+')</script>');
        } else {
          renderTag(tag);
        }

        ifr.doc._write('</div>');
      }

      pauseMonitor.checkDone();
    },

    function intermission(done) {
      console.log('\nintermission');

      if(GENERATE_EXPECTED || !options.useExpected) {
        var testBehavior = nativeBehavior['test '+name] = {};

        // spit out native
        for(i = 0; tag = tags[i]; i++) {
          testBehavior[tag.id] = {
            calls: tag.nativeCtx.calls
          };
        }
      }
      done();
    },

    function WRITER_MODE(done) {

      console.log('\ntest writer');

      ifr = IFrame('[ACTUAL]'+name);

      ifr.doc.write = function(str) {
        ok(false, ifr.doc.currentTag.id + ' - document.write outside: ' + str);
      };

      for(i = 0; tag = tags[i]; i++) {
        ifr.doc._write('<div class=tag id='+tag.id+'></div>');
      }

      // render at the bottom of the page.

      mode = 'writer';

      pauseMonitor = PauseMonitor(done);

      var shuffledTags = random.shuffle(tags);

      for(i = 0; tag = shuffledTags[i]; i++) {
        renderTag(tag);
      }

      pauseMonitor.checkDone();
    },

    function finishedTest(done) {
      start();
      console.log('test finished '+name);
      done();
    }
  ];

  var next = function() {
    var fn = queue.shift();
    if(fn) {
      fn(next);
    }
  };

  next();
};


// innerHTML is sync under FF3.6. document.write is not.
// We only care about this for testing. On a live site htmlWrite
// behaves correctly because it's using innerHTML and not document.write
var supports = {
  docwriteSync: !($.browser.mozilla && $.browser.version.indexOf('1.9.') === 0)
};

var nativeTimeout;
var testWrite = function(name) {
  var fns = [].slice.call(arguments, 1);

  var Tag = function(render) {
    return {
      render: render
    };
  };

  var tags = [];

  for(var i = 0, fn; fn = fns[i]; i++) {
    tags.push(Tag(fn));
  }

  // TEST OPTIONS
  var options = testOptions;

  test(name+(window.JSON ? JSON.stringify(options):''), function() {
    execute(name, tags, options);

    if(GENERATE_EXPECTED && window.JSON && JSON.stringify) {
      clearTimeout(nativeTimeout);
      nativeTimeout = setTimeout(function() {
        console.log('Native behavior:');
        console.log(JSON.stringify(nativeBehavior));
      }, 2000);
    }

  });
};

//htmlParser.supports.tagSoup = false;

var setOptions = function(options) {
  options.useExpected = true;
  if(!supports.docwriteSync && !options.useExpected) {
    options.useInnerHtml = true;
  }
  if(options.useInnerHtml) {
    options.async = false;
    options.bufferPartialTags = true;
  }
  testOptions = options;
};

