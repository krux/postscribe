/* global $,testWrite,setOptions,supports */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  QUnit.module('immediacy');
  setOptions({
    useExpected: !supports.docwriteSync
  });

  testWrite('getElementById', ctx => {
    ctx.write('<div id="foo"><div>bar');

    let span = ctx.doc.createElement('span');
    span.innerHTML = 'baz';
    ctx.doc.getElementById('foo').appendChild(span);

    ctx.write('<i>bla</i></div>');
  });

});

