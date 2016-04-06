/*globals $:false,module,setOptions,testWrite,asyncTest,postscribe,ok,start,skip,supports,test,stop*/
$(document).ready(function() {

  module('Simple writes');
  setOptions({});

  testWrite('empty tag', function(ctx) {
    ctx.write('<span>A<input name="B">C</span>D');
  });

  testWrite('SW1', function(ctx) {
    ctx.write('<div>');
    ctx.write('<i>foo');
  });

  testWrite('SW2', function(ctx) {
    ctx.write('<div><i');
    ctx.write('>foo');
  });

  testWrite('SW2-b', function(ctx) {
    ctx.write('<div>foo');
    ctx.write('<div>bar');
  });

  testWrite('SW3', function(ctx) {
    ctx.write('<div><i>foo');
    ctx.write('</i><div>bar');
  });

  testWrite('SW4', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo');
  });

  testWrite('SW5', function(ctx) {
    ctx.write('<div><i></i></div>foo');
  });

  testWrite('SW6', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('<div>foo<i');
    ctx.write('></i></div>bar');
  });

  testWrite('SW7', function(ctx) {
    ctx.write('<div><div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('SW8', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('<i></i>');
  });

  testWrite('SW9', function(ctx) {
    ctx.write('<div><i></i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('<i></i>');
  });

  testWrite('SW10', function(ctx) {
    ctx.write('<div><b><i></i></b></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</i>bla');
  });

});

