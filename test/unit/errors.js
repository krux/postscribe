$(document).ready(function() {

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

  testError('syntax-error', '<script>va x</script>');

  testError('js exception', '<script>throw 1;</script>');

  // IE cannot report remote script errors
  testError('remote script malformed url', '<script src="404"></script>');

  testError('remote script 404', '<script src="http://cdn.krxd.net/not_found"></script>');

});

