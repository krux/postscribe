/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('Self Closing');
  setOptions({});

  testWrite('Handles closed self-closing tags that\'re closed.', ctx => {
    ctx.writeln(
      '<div id="first" style="background: red; padding: 5px">' +
      '<embed></embed>' +
      '<div id="second" style="background: yellow">Should be yellow in red box, right?</div>' +
      '</div>'
    );
  });

  testWrite('Handles closed self-closing tags that\'re closed w/ a slash.', ctx => {
    ctx.writeln(
      '<div><object><param name="allowFullScreen" value="true" /><param></param></object></div>'
    );
  });

});

