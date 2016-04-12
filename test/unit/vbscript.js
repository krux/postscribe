/* global $,postscribe,test,ok,start */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('vbscript');

  if (window.supportsVbscript) {
    test('vbscript', () => {
      const div = document.createElement('div');
      div.id = 'vbscript-test';
      document.body.appendChild(div);
      postscribe('#vbscript-test', '<script type="text/vbscript">canWriteVbscriptTags = true</script>');
      ok(window.canWriteVbscriptTags, 'wrote vbscript tag');

      stop();
      postscribe('#vbscript-test', '<script type="text/vbscript" src="remote/set-global.vb"></script>', {
        done: () => {
          ok(window.remoteVbscriptGlobal, 'wrote remote vbscript tag');
          start();
        }
      });
    });
  }

});

