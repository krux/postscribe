/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('attributes');
  setOptions({});

  testWrite('string double quote', ctx => {
    ctx.write('<img alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string single quote', ctx => {
    ctx.write('<img alt=\'foo\'>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('string unquoted', ctx => {
    ctx.write('<img alt=foo>');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('empty string', ctx => {
    ctx.write('<img alt="">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('no value', ctx => {
    ctx.write('<input type="checkbox" checked>');
    ctx.eq($('input', ctx.doc).attr('checked'));
  });

  testWrite('self closing', ctx => {
    ctx.write('<div class="foo"/>');
  });
});

