/*globals phantom:false, window:false, QUnit:false*/
var fs = require('fs');
var system = require('system');
var page = require('webpage').create();
var args = system.args;

var url = 'file://./' + args[1]; // + '#generate_expected=1';

page.onCallback = function(msg) {
  var content = '// FILE GENERATED AUTOMATICALLY. DO NOT MODIFY THIS FILE. THIS FILE IS GIT-IGNORED.\n';
  content += 'window.expectedBehavior = \n' + msg.data + ';';
  fs.write(args[2], content);
  phantom.exit();
};

page.onError = function(e) {
  console.error(e);
};

page.onConsoleMessage = function(msg) {
  console.info(msg);
};

page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + ', URL: ' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

var loaded;
page.open(url, function(status) {
  if (!loaded) {
    loaded = true;

    if (status !== 'success') {
      console.error('Bad status \'' + status + '\'');
      phantom.exit();
    }

    var result = page.evaluate(function() {
      console.info(document.body.children.length);
      return document.body.innerHTML;
      /*
      var finish = function() {
        window.callPhantom({
          type: 'expected',
          data: JSON.stringify(window.nativeBehavior, null, 2)
        });
      };

      // Give up if a test fails after a long time.
      var handle;
      window.QUnit.testStart(function(details) {
        handle = window.setTimeout(function() {
          console.error('~STUCK~\n', details.name, '\ndid not complete!');
          console.error('Passing along whatever data is available.');
          finish();
        }, 5000);
      });

      window.QUnit.testDone(function() {
        window.clearTimeout(handle);
      });

      window.QUnit.done(function() {
        console.log('Tests done.');
        finish();
      });

       */
    });

    console.info(result);
    phantom.exit();
  }
});

