/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  QUnit.module('Simple writes');
  setOptions({});

  testWrite('empty tag', ctx => {
    ctx.write('<span>A<input name="B">C</span>D');
  });

  testWrite('SW1', ctx => {
    ctx.write('<div>');
    ctx.write('<i>foo');
  });

  testWrite('SW2', ctx => {
    ctx.write('<div><i');
    ctx.write('>foo');
  });

  testWrite('SW2-b', ctx => {
    ctx.write('<div>foo');
    ctx.write('<div>bar');
  });

  testWrite('SW3', ctx => {
    ctx.write('<div><i>foo');
    ctx.write('</i><div>bar');
  });

  testWrite('SW4', ctx => {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo');
  });

  testWrite('SW5', ctx => {
    ctx.write('<div><i></i></div>foo');
  });

  testWrite('SW6', ctx => {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo<i');
    ctx.write('></i></div>bar');
  });

  testWrite('SW7', ctx => {
    ctx.write('<div><div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('SW8', ctx => {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('<i></i>');
  });

  testWrite('SW9', ctx => {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('<i></i>');
  });

  testWrite('SW10', ctx => {
    ctx.write('<div><b><i></i></b></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</i>bla');
  });

});

