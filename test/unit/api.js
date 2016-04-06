$(document).ready(function() {

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

