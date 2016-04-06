/* global $,testWrite,setOptions,supports */
/* eslint-disable no-var */

$(document).ready(function() {

  module('immediacy');
  setOptions({
    useExpected: !supports.docwriteSync
  });

  testWrite('getElementById', function(ctx) {
    ctx.write('<div id="foo"><div>bar');

    var span;
    span = ctx.doc.createElement('span');
    span.innerHTML = 'baz';
    ctx.doc.getElementById('foo').appendChild(span);

    ctx.write('<i>bla</i></div>');
  });

});

