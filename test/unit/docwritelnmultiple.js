/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('writeln with multiple arguments');
  setOptions({});

  testWrite('wlma: split mid-element', ctx => {
    ctx.writeln('<i', 'mg alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: split mid-attribute', ctx => {
    ctx.writeln('<img a', 'lt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: split mid-attribute-value', ctx => {
    ctx.writeln('<img alt="f', 'oo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: empty strings', ctx => {
    ctx.writeln('', '<im', '', 'g ', '', 'al', '', 't="f', '', 'oo">', '');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: docwrite outside parent of script', ctx => {
    ctx.writeln('<div>A<script type="', 'text/javascript">\n',
      'doc', 'ument.write("B</div>C");\n</script>D');
  });

  testWrite('wlma: SW9', ctx => {
    ctx.writeln('<div><i></i></div>', 'foo', '<div>bar', '<i></i>');
  });

  testWrite('wlma: SW10', ctx => {
    ctx.writeln('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla');
  });

  testWrite('wlma: TS2', ctx => {
    ctx.writeln('<div><i>', '<div>foo', '<div><i>');
  });

});

