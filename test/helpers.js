/* global $,postscribe,test,ok,equal,start,stop,random,Prescribe */
/* eslint-disable no-var,no-console,consistent-this,no-cond-assign,new-cap,no-unused-vars */
import postscribe from '../src/postscribe';
import $ from 'jquery';

if (/wait=1/.test(location.href) || window.wait) {
  // wait before running tests.
  test('waiting', stop);
}

const GENERATE_EXPECTED = !window.expectedBehavior;

let testOptions = {};

const ignoreScripts = (function() {
  var div = document.createElement('div');
  var html = '<SCRIPT TYPE="text/javascript" SRC="remote/write-div.js"></SCRIPT>';
  div.innerHTML = html;
  return div.innerHTML.indexOf(html) === -1;
}());

const innerHtml = el => {
  const html = el.innerHTML
    .replace(/\.js\?0\.\d+/g, '.js')
    // The contents of iframes gets doubly-escaped because we pass the expected value through innerHTML.
    // So we ignore it.
    .replace(/(<iframe[^>]*>)[\s\S]*?(<\/iframe>)/ig, '$1$2');
  return ignoreScripts ?
    // remove all scripts (IE7/8, FF)
    // IE7/8 because we pass expected html through the innerHTML of a div, scripts don't appear
    // FF reverses order of attributes in the case that SRC is capitalized.
    html.replace(/(\r\n)?<script[^>]*>[\s\S]*?<\/script>(\r\n)?/ig, '') :
    // only remove helper scripts
    // Webkit, IE9
    html.replace(/<script class="test_helper">.*?<\/script>/g, '');
};

window.nativeBehavior = {};

if (!window.console) {
  window.console = {
    log: () => {
    }
  };
}

let getDoc = iframe => iframe.contentWindow.document;

let qunitEqual = window.equal;
window.equal = (x, y, msg) => qunitEqual(y, x, msg);

let ifrId = 0;

export const IFrame = (id, ready) => {
  const ifr = document.createElement('iframe');

  ifr.setAttribute('id', 'ifr' + (ifrId++));

  ifr.addEventListener('load', () => {
    ready(ifr.contentDocument);
  });

  // append it to dom so we can get the document
  document.body.appendChild(ifr);
  return ifr;
};

const PauseMonitor = done => {
  let timeout;
  const self = {

    contexts: [],

    // ctx's interface: resume method + paused boolean attribute.
    add: ctx => {
      self.contexts.push(ctx);

      // override ctx's resume method
      var resume = ctx.resume;
      ctx.resume = () => {
        // call ctx's old resume method
        resume.apply(ctx, arguments);
        self.checkDone();
      };
    },

    checkDone: () => {
      clearTimeout(timeout);
      // check if we're done on next tick.
      timeout = setTimeout(() => {
        for (let i = 0, ctx; ctx = self.contexts[i]; i++) {
          if (ctx.paused) {
            return;
          }
        }
        done();
        done = null;
      }, 0);
    }

  };

  return self;
};

// a tag is a function that takes a document context
const execute = (name, tags, options) => {
  random.reset();

  for (let i = 0, tag; tag = tags[i]; i++) {
    tag.id = 'tag' + i;
  }

  let ifr;
  let mode;
  let pauseMonitor;

  const Context = {
    common: function(tag) {
      const doc = getDoc(ifr);

      const self = tag[mode + 'Ctx'] = {

        tag: tag,

        mode: mode,

        doc: doc,

        div: doc.getElementById(tag.id),

        written: '',

        pause: () => {
          self.paused = true;
        },

        resume: () => {
          self.paused = false;
        },

        onFinished: () => {
          self.eq(innerHtml(self.div), tag.id + ':Final InnerHtml');
        },

        render: () => {
          self.tag.render(self);
          self.pause();
          self.writeCallback(() => {
            self.onFinished();
            self.resume();
          }, 'Rendering Complete');
        },

        compareInnerHtml: (...args) => {
          self.eqPrefix(innerHtml(self.div), tag.id + ':' + args.join(''));
        }
      };

      const delegateMethod = method => {
        self[method] = () => {
          return doc[method].apply(doc, arguments);
        };
      };

      let method;
      const methods = 'write writeln writeInline writeRemote writeCallback'.split(' ');
      while (method = methods.pop()) {
        delegateMethod(method);
      }

      return self;
    },

    native: tag => {

      const self = Context.common(tag);

      self.calls = [];

      self.eq = (...args) => {
        self.calls.push(args);
      };

      self.eqPrefix = (...args) => {
        self.calls.push(args);
      };

      self.expect = () => {
        // do nothing
      };

      const parser = new Prescribe('', {
        autoFix: true
      });

      self.doc.write = function(...args) {
        if (parser) {
          $.each(args, (index, value) => {
            parser.append(value);
          });
          args = (function() {
            var str = '';
            for (var tok; tok = parser.readToken();) {
              str += tok.text;
            }
            return [str];
          }());
        }

        $.each(args, (index, value) => self.written = self.written + value);

        if (options.useInnerHtml) {
          self.div.innerHTML = self.written;
        } else {
          self.doc._write.apply(self.doc, args);
        }
        self.compareInnerHtml.apply(self, args);
      };

      return self;
    },

    writer: tag => {
      const self = Context.common(tag);
      const work = self.doc.createElement('div');

      let expectCalls;

      if (window.expectedBehavior) {
        expectCalls = window.expectedBehavior['test ' + name][tag.id].calls;
      } else {
        expectCalls = [].slice.call(tag.nativeCtx.calls);
      }

      self.expect = (expects) => {
      };

      // Remove first \r\n from actual (needed for IE7-8)
      let clipRN = str => {
        return str.replace(/^\r\n/, '');
      };

      self.eq = (val, msg) => {
        let args = expectCalls.shift();

        if (args && window.expectedBehavior) {
          // run it through innerHTML to get rid of browser inconsistencies
          work.innerHTML = args[0];
          args[0] = innerHtml(work);
        }

        if (!args) {
          args = ['args was null', 'args was null'];
        } else if (args[1] !== msg) {
          msg = 'mismatch: 1:' + args[1] + ' 2:' + msg;
        }

        if (args[0] !== val) {
          console.log('Test Fail', msg);
        }

        equal(args[0], clipRN(val), msg);
      };

      // writer should have at least what native has.
      self.eqPrefix = (val, msg) => {
        let args = expectCalls.shift();

        if (args && window.expectedBehavior) {
          // run it through innerHTML to get rid of browser inconsistencies
          work.innerHTML = args[0];
          args[0] = innerHtml(work);
        }

        if (!args) {
          args = ['args was null', 'args was null'];
        } else if (args[1] !== msg) {
          msg = 'mismatch: 1:' + args[1] + ' 2:' + msg;
        }

        if (val.indexOf(args[0]) !== 0) {
          if (args[0] !== clipRN(val)) {
            console.log('Test Fail', msg);
          }
          equal(args[0], clipRN(val), msg);
        } else {
          ok(true, msg);
        }
      };

      return self;
    }
  };

  const renderTag = tag => {
    const ctx = Context[mode](tag, ifr.doc);
    pauseMonitor.add(ctx);
    ctx.render();
  };

  // pause the qunit test
  stop();

  const queue = [

    function NATIVE_MODE(done) {
      if (window.expectedBehavior) {
        done();
        return;
      }

      ifr = IFrame('[EXPECTED]' + name);

      // render tags inline
      mode = 'native';

      pauseMonitor = PauseMonitor(done);

      ifr.contentWindow.renderTag = i => renderTag(tags[i]);

      let tag;
      for (var i = 0; tag = tags[i]; i++) {

        ifr.doc._write('<div class=tag id=' + tag.id + '>');

        // render inline
        ifr.doc._write('<script class="test_helper">renderTag(' + i + ')</script>');
        ifr.doc._write('</div>');
      }

      pauseMonitor.checkDone();
    },

    done => {
      if (GENERATE_EXPECTED) {
        const testBehavior = window.nativeBehavior['test ' + name] = {};

        // spit out native
        for (let i = 0; tag = tags[i]; i++) {
          testBehavior[tag.id] = {
            calls: tag.nativeCtx.calls
          };
        }
      }
      done();
    },

    done => {
      ifr = IFrame('[ACTUAL]' + name);

      ifr.doc.write = () => {
        ok(false, ifr.doc.currentTag.id + ' - document.write outside: ' + [].slice.call(arguments).join(''));
      };

      for (let i = 0; tag = tags[i]; i++) {
        ifr.doc._write('<div class=tag id=' + tag.id + '></div>');
      }

      // render at the bottom of the page.

      mode = 'writer';

      pauseMonitor = PauseMonitor(done);

      const shuffledTags = random.shuffle(tags);

      ifr.contentWindow.renderTag = i => {
        const ctx = shuffledTags[i].ctx;
        ctx.doc.currentTag = tag;
        ctx.render();
      };

      const tryShuffledTag = (tag, i) => {
        const ctx = Context[mode](tag, ifr.doc);
        pauseMonitor.add(ctx);
        tag.ctx = ctx;
        ctx.writer = postscribe(ctx.div, '<script class="test_helper">renderTag(' + i + ')</script>', {
          name: tag.id,
          beforeWrite: str => str,
          afterWrite: str => {
            ctx.written += str;
            ctx.compareInnerHtml(str);
          },
          error: e => {
            throw e;
          }
        });
      };

      for (let i = 0; i < shuffledTags.length; i++) {
        tryShuffledTag(shuffledTags[i], i);
      }

      pauseMonitor.checkDone();
    },

    done => {
      start();
      done();
    }
  ];

  const next = () => {
    const fn = queue.shift();
    if (fn) {
      fn(next);
    }
  };

  next();
};

// innerHTML is sync under FF3.6. document.write is not.
// We only care about this for testing. On a live site htmlWrite
// behaves correctly because it's using innerHTML and not document.write
const supports = {
  docwriteSync: false
};

var nativeTimeout;
export let testWrite = name => {
  var fns = [].slice.call(arguments, 1);

  function Tag(render) {
    return {
      render: render
    };
  }

  var tags = [];

  for (var i = 0, fn; fn = fns[i]; i++) {
    tags.push(Tag(fn));
  }

  // TEST OPTIONS
  var options = testOptions;

  test(name + (window.JSON ? ' ' + JSON.stringify(options) : ''), () => {
    try {
      execute(name, tags, options);

      if (GENERATE_EXPECTED && window.JSON && JSON.stringify) {
        clearTimeout(nativeTimeout);
        nativeTimeout = setTimeout(() => {
          console.log('Native behavior:');
          console.log(JSON.stringify(window.nativeBehavior));
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  });
};

export function setOptions(options) {
  options.useExpected = true;
  if (!supports.docwriteSync && !options.useExpected) {
    options.useInnerHtml = true;
  }
  if (options.useInnerHtml) {
    options.async = false;
    options.bufferPartialTags = true;
  }
  testOptions = options;
}

export let skip = () => () => {
};

document.write([
  '<script type="text/vbscript">',
  'supportsVbscript = true',
  '</script>'
].join('\n'));
