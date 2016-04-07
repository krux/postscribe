/*jshint browser:true*/
/*globals $:false,module,setOptions,testWrite,asyncTest,postscribe,ok,start,skip,supports,test,stop*/
$(document).ready(function() {

  // style elements
  // comments
  // noscript
  // escaped attributes (see writeCapture)
  // tbody!

  module('style');
  setOptions({});
  testWrite('simple style', function(ctx) {
    ctx.write('<style type="text/css">#test_style {' +
      'background:blue;' +
      'width:200px;' +
      'height:300px;' +
      'border: 2px solid red;' +
    '}</style>' +
    '<div id="test_style">' +
    '<img src="http://lorempixel.com/100/80/sports/"/>' +
    '<div data-x="a<b"></div>' +
    '</div>');
  });


  module('attributes');
  setOptions({});

  testWrite('string double quote', function(ctx) {
    ctx.write('<img alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string single quote', function(ctx) {
    ctx.write('<img alt=\'foo\'>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string unquoted', function(ctx) {
    ctx.write('<img alt=foo>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('empty string', function(ctx) {
    ctx.write('<img alt="">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('no value', function(ctx) {
    ctx.write('<input type="checkbox" checked>');
    ctx.eq($('input', ctx.doc).attr('checked'));
  });

  testWrite('self closing', function(ctx) {
    ctx.write('<div class="foo"/>');
  });


  // document.write (script) tests
  module('document.write');

  testWrite('remainder', function(ctx) {
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
    ctx.write('A<script src="remote/write-remote-and-inline-script.js">');
    ctx.write('</script>B');
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
  });

  testWrite('docwrite outside parent of script', function(ctx) {
    ctx.write('<div>A<script type="text/javascript">document.write("B</div>C");</script>D');
  });

  testWrite('capital script', function(ctx) {
    ctx.write('A<SCRIPT type="text/javascript">document.write("B");</SCRIPT>C');
  });

  testWrite('different case script', function(ctx) {
    ctx.write('A<SCRIPT type="text/javascript">document.write("B");</script>C');
  });

  testWrite('capital script@SRC', function(ctx) {
    ctx.write('<SCRIPT TYPE="text/javascript" SRC="remote/write-div.js"></SCRIPT>');
  });

  testWrite('inline', function(ctx) {
    ctx.write('A<script type="text/javascript">document.write("B");</script>C');
  });

  testWrite('nested document.write', function(ctx) {
    // document.write calls document.write!
    var inner = "B<script type='text/javascript'>document.write('C');<\\/script>D";
    ctx.write('A<script type="text/javascript">document.write("'+inner+'");</script>E');
  });

  testWrite('globals', function(ctx) {
    ctx.write('<script>var XQWER = "foo";</script><script>document.write(""+window.XQWER + (this === window) + (window === top));</script>');
  });

  // Native doesn't seem to support this!
  skip(testWrite)('partial script', function(ctx) {
    ctx.write('<script>var QWVES=1');
    ctx.write('7;</script>');
    ctx.write('<script>document.write(QWVES);</script>');
  });

  testWrite('remote then write', function(ctx) {
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('double remote', function(ctx) {
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote then remote then write', function(ctx) {
    ctx.writeRemote('remote/write-remote-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote => (remote and inline), write', function(ctx) {
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote then inline then write', function(ctx) {
    ctx.writeRemote('remote/write-inline-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  // IE natively does this wrong. It uses the inline global instead of the remote one.
  testWrite('remote + global', function(ctx) {
    ctx.writeInline('var global1 = "inline global1"');
    ctx.writeRemote('remote/set-global1.js');
    ctx.writeInline('document.write(this.global1);');
  });

  testWrite('corrupt src', function(ctx) {
    ctx.write('<img src"abc.jpg"><div>WORKS</div>');
  });

  // HTML Escaped Entities Check for DFP6 Sync mode (numerical only)
  testWrite('Escaped HTML Entity remote script', function(ctx) {
    ctx.write('<SCRIPT TYPE="text/javascript" SRC="remote&#47;write-div.js"></SCRIPT>');
  });

  // HTML Escaped Entities - handle amp escaping on src attributes
  testWrite('Escaped ampersand in src of remote script', function(ctx) {
    ctx.write('<script type="text/javascript" src="remote/write-using-query-string.js?k=1&amp;k2=2"></script>');
  });

  // HTML Escaped Entities - do not convert &para to a paragraph symbol
  testWrite('&para in querystring not escaped to paragraph symbol ', function(ctx) {
    ctx.write('<script type="text/javascript" src="remote/write-using-query-string.js?k=1&param=foo"></script>');
  });

  // HTML Escaped Entities check issue #81 fix
  testWrite('Escaped HTML Entity script entity name', function(ctx) {
    ctx.write('<div data-x="a&lt;b"></div>');
  });

  // general html entity checking
  testWrite('HTML entity text to write', function(ctx) {
    ctx.write('<span><p>foo&amp;&#47;&#x00024;</p></span>');
  });

  testWrite('Escaped HTML Entity remote image', function(ctx) {
    ctx.write('<img src="http&#58;&#47;&#47;lorempixel.com&#47;400&#47;200&#47;sports&#47;" alt="image"/>');
  });


  module('document.write overwriting.');
  function readNativeDocumentMethodString(method) {
    // Cache cause this takes a long time.
    var cache = readNativeDocumentMethodString.cache;
    if (!cache) {
      cache = readNativeDocumentMethodString.cache = {};
    }
    var result = cache[method];
    if (result) {
      return result;
    }
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    result = cache[method] = String(iframe.contentDocument[method]);
    iframe.parentNode.removeChild(iframe);
    return result;
  }

  function isNative(method) {
    return String(document[method]) === readNativeDocumentMethodString(method);
  }

  // Must be async to avoid polluting doc.write for the next tests.
  asyncTest('overrides document.write for normal scripts.', 2, function() {
    ok(isNative('write'));
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      done: start
    });
    ok(!isNative('write'));
  });

  asyncTest('does not override document.write for async scripts.', 2, function() {
    ok(isNative('write'));
    postscribe(document.body, '<script async src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      done: start
    });
    ok(isNative('write'));
  });

  asyncTest('afterAsync fires when async ignored.', 1, function() {
    postscribe(document.body, '<script async src="remote/describe-write.js"></script>', {
      releaseAsync: false,
      afterAsync: function() {
        ok(1);
        start();
      }
    });
  });

  asyncTest('afterAsync fires when no async attr ignored.', 1, function() {
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      afterAsync: function() {
        ok(1);
        start();
      }
    });
  });

  asyncTest('overrides and returns writeln, open, and close', function() {
    function all(assertion) {
      var methods = ['writeln', 'open', 'close'];
      for (var i = 0, len = methods.length; i < len; ++i) {
        assertion(isNative(methods[i]));
      }
    }

    all(ok);
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      afterAsync: function() {
        all(ok);
        start();
      }
    });
    all(function(val) {return ok(!val);});
  });


  module('multiple');
  testWrite('MULT1',

    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    } ,
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    function(ctx) {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    }
  );


  // Test simple writing
  module('Self Closing');
  setOptions({});

  testWrite('Handles closed self-closing tags that\'re closed.', function(ctx) {
    ctx.writeln(
      '<div id="first" style="background: red; padding: 5px">' +
        '<embed></embed>' +
        '<div id="second" style="background: yellow">Should be yellow in red box, right?</div>' +
      '</div>'
    );
  });

  testWrite('Handles closed self-closing tags that\'re closed w/ a slash.', function(ctx) {
    ctx.writeln(
      '<div><object><param name="allowFullScreen" value="true" /><param></param></object></div>'
    );
  });


  module('Simple writes');
  setOptions({});

  testWrite('empty tag', function(ctx) {
    ctx.write('<span>A<input name="B">C</span>D');
  });

  testWrite('SW1', function(ctx) {
    ctx.write('<div>');
    ctx.write('<i>foo');
  });

  testWrite('SW2', function(ctx) {
    ctx.write('<div><i');
    ctx.write('>foo');
  });

  testWrite('SW2-b', function(ctx) {
    ctx.write('<div>foo');
    ctx.write('<div>bar');
  });

  testWrite('SW3', function(ctx) {
    ctx.write('<div><i>foo');
    ctx.write('</i><div>bar');
  });

  testWrite('SW4', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo');
  });

  testWrite('SW5', function(ctx) {
    ctx.write('<div><i></i></div>foo');
  });

  testWrite('SW6', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo<i');
    ctx.write('></i></div>bar');
  });

  testWrite('SW7', function(ctx) {
    ctx.write('<div><div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('SW8', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('<i></i>');
  });

  testWrite('SW9', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('<i></i>');
  });

  testWrite('SW10', function(ctx) {
    ctx.write('<div><b><i></i></b></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</i>bla');
  });


  // Test that writing happens immediately
  module('immediacy');
  setOptions({
    useExpected: !supports.docwriteSync
  });

  testWrite('getElementById', function(ctx){
    ctx.write('<div id="foo"><div>bar');

    var span;
    span = ctx.doc.createElement('span');
    span.innerHTML = 'baz';
    ctx.doc.getElementById('foo').appendChild(span);

    ctx.write('<i>bla</i></div>');
  });


  module('Tag Soup');
  setOptions({});

  testWrite('TS1', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
  });

  testWrite('TS2', function(ctx) {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
    ctx.write('<div><i>');
  });

  testWrite('foo should be italicized', function(ctx) {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
  });

  testWrite('inside-out i/p', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo');
  });

  testWrite('TS5', function(ctx) {
    ctx.write('<div><i></div>');
  });

  testWrite('TS6', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo<i>');
    ctx.write('</div>bar');
  });

  testWrite('character placeholders', function(ctx) {
    ctx.write('<div><div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('just a close tag', function(ctx) {
    ctx.write('</i>');
  });

  testWrite('TS9', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('</i>');
  });

  testWrite('TS10', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('</i>');
  });

  testWrite('TS11', function(ctx) {
    ctx.write('<div><b><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</b>bla');
  });

  testWrite('random stuff', function(ctx) {
    //ctx.write('<div>h</i>ey<i');
    ctx.write('<div>hey<i');
    ctx.write('>there<div>Continue </i>outside');
    ctx.write('<div>Not<b> italics<i></div>');
    ctx.write('in italics');
    ctx.write('<div>Should also be in italics<i>');
    ctx.write('</div>in it</b>alics2<b');
    ctx.write('><div>hi</div>');
    ctx.write('<div>h</i>ey<i');
    ctx.write('>there</div>Continue </i>outside<b>please</b>');
  });

  testWrite('iframe with script content', function(ctx) {
    //noinspection BadExpressionStatementJS
    ctx.writeInline('document.write("<iframe><script><\\/script></iframe>")');
  });

  testWrite('textarea with script content', function(ctx) {
    //noinspection BadExpressionStatementJS
    ctx.writeInline('document.write("<textarea><script><\\/script></textarea>")');
  });

  test('naked remote write', function() {
    var div = document.createElement('div');
    div.id = 'naked-remote-write';
    document.body.appendChild(div);
    stop();
    postscribe('#naked-remote-write', '<script src="remote/write-div.js"></script>', function() {
      ok(true);
      start();
    });
  });


  module('vbscript');

  // VBScript
  if(window.supportsVbscript) {
    test('vbscript', function() {
      var div = document.createElement('div');
      div.id = 'vbscript-test';
      document.body.appendChild(div);
      postscribe('#vbscript-test', '<script type="text/vbscript">canWriteVbscriptTags = true</script>');
      ok(window.canWriteVbscriptTags, 'wrote vbscript tag');

      stop();
      postscribe('#vbscript-test', '<script type="text/vbscript" src="remote/set-global.vb"></script>', {
        done: function() {
          ok(window.remoteVbscriptGlobal, 'wrote remote vbscript tag');
          start();
        }
      });

    });
  }


  module('errors');

  function testError(name, html) {
    test(name, function() {
      var oldOnError = window.onerror;
      window.onerror = null;
      var div = document.createElement('div');
      div.id = name.replace(/\s/g, '-');
      document.body.appendChild(div);
      var error;
      stop();
      postscribe(div, html, {
        error: function(e) {
          error = e;
        },
        done: function() {
          ok(error);
          window.onerror = oldOnError;
          start();
        }
      });
    });
  }

  if(!$.browser.msie || $.browser.version > 8) {
    // Doesn't work in IE7/8
    //noinspection JSUnresolvedVariable,JSUnresolvedVariable,BadExpressionStatementJS
    testError('syntax-error', '<script>va x</script>');

    testError('js exception', '<script>throw 1;</script>');
  }

  if(!$.browser.msie) {
    // IE cannot report remote script errors

    testError('remote script malformed url', '<script src="404"></script>');

    testError('remote script 404', '<script src="http://cdn.krxd.net/not_found"></script>');

    // TODO: This doesn't work in phantomJS "generate_expected"
    //testError('remote script exception', "<script src='remote/error.js'></script>");

  }


  module('write with multiple arguments');
  setOptions({});

  testWrite('wma: split mid-element', function(ctx) {
    ctx.write('<i', 'mg alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: split mid-attribute', function(ctx) {
    //noinspection BadExpressionStatementJS
    ctx.write('<img a', 'lt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: split mid-attribute-value', function(ctx) {
    ctx.write('<img alt="f', 'oo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: empty strings', function(ctx) {
    ctx.write('', '<im', '', 'g ', '', 'al', '', 't="f', '', 'oo">', '');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: docwrite outside parent of script', function(ctx) {
    //noinspection BadExpressionStatementJS
    ctx.write('<div>A<script type="', 'text/javascript">\n',
        'doc', 'ument.write("B</div>C");\n</script>D');
  });

  testWrite('wma: SW9', function(ctx) {
    ctx.write('<div><i></i></div>', 'foo', '<div>bar', '<i></i>');
  });

  testWrite('wma: SW10', function(ctx) {
    ctx.write('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla');
  });

  testWrite('wma: TS2', function(ctx) {
    ctx.write('<div><i>', '<div>foo', '<div><i>');
  });

  module('writeln with multiple arguments');
  setOptions({});

  testWrite('wlma: split mid-element', function(ctx) {
    ctx.writeln('<i', 'mg alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: split mid-attribute', function(ctx) {
    ctx.writeln('<img a', 'lt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: split mid-attribute-value', function(ctx) {
    ctx.writeln('<img alt="f', 'oo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: empty strings', function(ctx) {
    ctx.writeln('', '<im', '', 'g ', '', 'al', '', 't="f', '', 'oo">', '');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: docwrite outside parent of script', function(ctx) {
    ctx.writeln('<div>A<script type="', 'text/javascript">\n',
        'doc', 'ument.write("B</div>C");\n</script>D');
  });

  testWrite('wlma: SW9', function(ctx) {
    ctx.writeln('<div><i></i></div>', 'foo', '<div>bar', '<i></i>');
  });

  testWrite('wlma: SW10', function(ctx) {
    ctx.writeln('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla');
  });

  testWrite('wlma: TS2', function(ctx) {
    ctx.writeln('<div><i>', '<div>foo', '<div><i>');
  });


  module('token processing');
  setOptions({});

  testBeforeWriteTokenCalled = function(name, html, type, expectedAmount) {
    test(name, function() {
      var amount = 0;
      var div = document.createElement('div');
      div.id = name.replace(/\s/g, '-');
      document.body.appendChild(div);
      stop();
      postscribe(div, html, {
        beforeWriteToken: function(tok) {
          if (tok.tagName === type && tok.type !== 'endTag') {
            amount++;
          }
          return tok;
        },
        done: function() {
          ok(amount === expectedAmount);
          start();
        }
      });
    });
  };

  testBeforeWriteTokenCalled('beforeWriteToken is called for div', '<div>Test</div>', 'div', 1);
  testBeforeWriteTokenCalled('beforeWriteToken is called for script', '<script>document.write("A");</script>', 'script', 1);
  testBeforeWriteTokenCalled('beforeWriteToken is called for style', '<style>#test { }</style>', 'style', 1);
  testBeforeWriteTokenCalled('beforeWriteToken is called for nested scripts', '<script src="remote/write-inline-script.js"></script>', 'script', 2);

  test('alter script src', function() {
    var div = document.createElement('div');
    div.id = 'alter-script-src';
    document.body.appendChild(div);
    stop();
    postscribe(div, '<script src="remote/write-inline-script.js"></script>', {
      beforeWriteToken: function(tok) {
        if (tok.tagName && tok.tagName === 'script') {
          tok.src = tok.src.replace('write-inline-script.js', 'write-div.js');
        }
        return tok;
      },
      done: function() {
        ok(div.firstChild.src.indexOf('write-div.js') > -1);
        start();
      }
    });
  });

  test('alter img src', function() {
    var div = document.createElement('div');
    div.id = 'alter-img-src';
    document.body.appendChild(div);
    stop();
    postscribe(div, '<img src="https://lorempixel.com/100/80/sports/" alt="">', {
      beforeWriteToken: function(tok) {
        if (tok.tagName && tok.tagName === 'img' && tok.attrs && tok.attrs.src) {
          tok.attrs.src = tok.attrs.src.replace('https://', 'http://');
        }
        return tok;
      },
      done: function() {
        ok(div.firstChild.src.indexOf('http://') === 0);
        start();
      }
    });
  });

  test('skip scripts from http sources', function() {
    var amount = 0;
    var div = document.createElement('div');
    div.id = 'skip-scripts-from-http-sources';
    document.body.appendChild(div);
    stop();
    postscribe(div, 
      '<script src="http://domain.com/example.js"></script>' +
      '<script src="remote/write-remote-and-inline-script.js"></script>' +
      '<script src="http://domain2.com/example2.js"></script>', 
      {
        beforeWriteToken: function(tok) {
          if (tok.tagName && tok.tagName === 'script') {
            if (tok.src && tok.src.indexOf('http:') === 0) {
              return null;
            } else {
              amount++;
            }
          }
          return tok;
        },
        done: function() {
          ok(amount === 10 && div.innerHTML.indexOf('<script src="http://') === -1);
          start();
        }
      }
    );
  });

  test('skip all style declarations', function() {
    var amount = 0;
    var div = document.createElement('div');
    div.id = 'skip-all-style-declarations';
    document.body.appendChild(div);
    stop();
    postscribe(div, 
      '<style type="text/css">body { background-color: green; }</style>' +
      '<STYLE type="text/css">img { border: 1px solid red; }</STYLE>', 
      {
        beforeWriteToken: function(tok) {
          if (tok.tagName && tok.tagName.toLowerCase() === 'style') {
            return null;
          }
          return tok;
        },
        done: function() {
          ok(div.innerHTML.indexOf('<style') === -1);
          start();
        }
      }
    );
  });


  module('api');

  var testCalled = function(desc, method) {
    asyncTest(desc + ' ' + method, function() {
      var options = {};
      options[method] = function() {
        ok(1);
        start();
      };
      postscribe(document.body, '<script type="text/javascript" src="remote/set-global1.js"></script>', options);
    });
  };

  testCalled('it calls', 'beforeEnqueue');
  testCalled('it calls', 'afterDequeue');
  testCalled('it calls', 'afterStreamStart');
});

