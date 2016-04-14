/* global $,postscribe,test,ok,start */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(function() {

  QUnit.module('errors');

  const testError = (name, html) => {
    test(name, () => {
      let oldOnError = window.onerror;
      window.onerror = null;
      const div = document.createElement('div');
      div.id = name.replace(/\s/g, '-');
      document.body.appendChild(div);
      let error;
      stop();
      postscribe(div, html, {
        error: e => {
          error = e;
        },
        done: () => {
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

