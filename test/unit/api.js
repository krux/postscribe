$(document).ready(function() {

  module('api');

  var testCalled = function(method) {
    asyncTest('it calls ' + method, function() {
      var options = {};
      options[method] = function() {
        ok(1);
        start();
      };

      postscribe(document.body, '<script type="text/javascript" src="remote/set-global1.js"></script>', options);
    });
  };

  testCalled('beforeEnqueue');
  testCalled('afterDequeue');
  testCalled('afterStreamStart');
});

