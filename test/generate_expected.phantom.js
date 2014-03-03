/*globals phantom:false, window:false, QUnit:false*/
var fs = require('fs');

var page = require('webpage').create();
var url = phantom.args[0] + '#generate_expected=1';

page.onCallback = function(msg) {
  var content = '// FILE GENERATED AUTOMATICALLY. DO NOT MODIFY THIS FILE. THIS FILE IS GIT-IGNORED.\n';
  content += 'window.expectedBehavior = \n' + msg.data + ';';
  fs.write(phantom.args[1], content);
  phantom.exit();
};

page.onError = function(e) {
  throw e;
};

page.onConsoleMessage = function(msg) {
  console.info(msg);
};

var loaded;
page.open(url, function(status) {
  if(!loaded) {
    loaded = true;

    if(status !== 'success') {
      throw 'Bad status \'' + status + '\'';
    }
    console.log('Page loaded.');
    page.evaluate(function() {
      var finish = function() {
        window.callPhantom({
          type: 'expected',
          data: JSON.stringify(window.nativeBehavior, null, 2)
        });
      };

      // Give up if a test fails after a long time. 
      var handle;
      QUnit.testStart(function(details) {
        handle = window.setTimeout(function() {
          console.error('~STUCK~\n', details.name, '\ndid not complete!');
          console.error('Passing along whatever data is available.');
          finish();
        }, 5000);
      });

      QUnit.testDone(function() {
        window.clearTimeout(handle);
      });

      QUnit.done(function() {
        console.log('Tests done.');
        finish();
      });
    });
  }
});

