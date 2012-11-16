/*global phantom:true*/

var fs = require('fs');

var page = require('webpage').create();

var url = "test/test.html#generate_expected=1";

page.onCallback = function(msg) {
  var content = "// FILE GENERATED AUTOMATICALLY. DO NOT MODIFY THIS FILE. THIS FILE IS GIT-IGNORED.\n";
  content += "window.expectedBehavior = \n" + msg.data + ";";
  fs.write('test/expected.js', content);
  phantom.exit();
};

page.onError = function(e) {
  throw(e);
};

page.onConsoleMessage = function(msg) {
  // console.log(msg);
};

page.onAlert = function(msg) {
  //console.log('alert: ' + msg);
};

page.onResourceRequested = function(r) {
  //console.log('requested ' + r.id);
};

page.onResourceReceived = function(r) {
  //console.log('received ' + r.id);
};

var loaded;
page.open(url, function(status) {
  if(!loaded) {
    loaded = true;

    if(status !== "success") {
      throw "Bad status '" + status + "'";
    }
    console.log('opened');
    page.evaluate(function() {
      QUnit.done = function() {
        callPhantom({type: 'expected', data: JSON.stringify(nativeBehavior)});
      };
    });
  }
});

