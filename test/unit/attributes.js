/* global $,testWrite,setOptions */
/* eslint-disable no-var */

$(document).ready(function() {

  module('attributes');
  setOptions({});

  testWrite('string double quote', function(ctx) {
    ctx.write('<img alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string single quote', function(ctx) {
    ctx.write('<img alt=\'foo\'>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string unquoted', function(ctx) {
    ctx.write('<img alt=foo>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('empty string', function(ctx) {
    ctx.write('<img alt="">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('no value', function(ctx) {
    ctx.write('<input type="checkbox" checked>');
    ctx.eq($('input', ctx.doc).attr('checked'));
  });

  testWrite('self closing', function(ctx) {
    ctx.write('<div class="foo"/>');
  });

});

