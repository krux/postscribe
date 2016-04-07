/*globals phantom:false, window:false, QUnit:false*/
var fs = require('fs');
var system = require('system');
var page = require('webpage').create();
var args = system.args;

var url = args[1];

page.onCallback = function(msg) {
  console.info('onCallback called');
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

page.onInitialized = function() {
  page.evaluate(function() {
    window.expectedBehavior = false;
  });
};

var loaded;

page.open(url, function(status) {
  if (!loaded) {
    loaded = true;

    if (status !== 'success') {
      console.error('Bad status \'' + status + '\'');
      phantom.exit();
    }

    page.evaluateAsync(function() {
      QUnit.done(function() {
        console.log('Tests done.');
        window.callPhantom({
          type: 'expected',
          data: JSON.stringify(window.nativeBehavior, null, 2)
        });
      });
    });
  }
});

