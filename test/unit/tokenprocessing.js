$(document).ready(function() {

  module('token processing');
  setOptions({});

  var testBeforeWriteTokenCalled = function(name, html, type, expectedAmount) {
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

});

