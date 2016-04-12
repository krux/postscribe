/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('write with multiple arguments');
  setOptions({});

  testWrite('wma: split mid-element', ctx => {
    ctx.write('<i', 'mg alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: split mid-attribute', ctx => {
    ctx.write('<img a', 'lt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: split mid-attribute-value', ctx => {
    ctx.write('<img alt="f', 'oo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: empty strings', ctx => {
    ctx.write('', '<im', '', 'g ', '', 'al', '', 't="f', '', 'oo">', '');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wma: docwrite outside parent of script', ctx => {
    ctx.write('<div>A<script type="', 'text/javascript">\n',
      'doc', 'ument.write("B</div>C");\n</script>D');
  });

  testWrite('wma: SW9', ctx => {
    ctx.write('<div><i></i></div>', 'foo', '<div>bar', '<i></i>');
  });

  testWrite('wma: SW10', ctx => {
    ctx.write('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla');
  });

  testWrite('wma: TS2', ctx => {
    ctx.write('<div><i>', '<div>foo', '<div><i>');
  });

});

