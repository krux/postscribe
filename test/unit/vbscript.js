/* global $,postscribe,test,ok,start */
/* eslint-disable no-var */

$(document).ready(function() {

  module('vbscript');

  if (window.supportsVbscript) {
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

});

