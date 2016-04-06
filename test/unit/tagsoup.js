/*globals $:false,module,setOptions,testWrite,asyncTest,postscribe,ok,start,skip,supports,test,stop*/
$(document).ready(function() {

  module('Tag Soup');
  setOptions({});

  testWrite('TS1', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
  });

  testWrite('TS2', function(ctx) {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
    ctx.write('<div><i>');
  });

  testWrite('foo should be italicized', function(ctx) {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
  });

  testWrite('inside-out i/p', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo');
  });

  testWrite('TS5', function(ctx) {
    ctx.write('<div><i></div>');
  });

  testWrite('TS6', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo<i>');
    ctx.write('</div>bar');
  });

  testWrite('character placeholders', function(ctx) {
    ctx.write('<div><div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('just a close tag', function(ctx) {
    ctx.write('</i>');
  });

  testWrite('TS9', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('</i>');
  });

  testWrite('TS10', function(ctx) {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('</i>');
  });

  testWrite('TS11', function(ctx) {
    ctx.write('<div><b><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</b>bla');
  });

  testWrite('random stuff', function(ctx) {
    //ctx.write('<div>h</i>ey<i');
    ctx.write('<div>hey<i');
    ctx.write('>there<div>Continue </i>outside');
    ctx.write('<div>Not<b> italics<i></div>');
    ctx.write('in italics');
    ctx.write('<div>Should also be in italics<i>');
    ctx.write('</div>in it</b>alics2<b');
    ctx.write('><div>hi</div>');
    ctx.write('<div>h</i>ey<i');
    ctx.write('>there</div>Continue </i>outside<b>please</b>');
  });

  testWrite('iframe with script content', function(ctx) {
    //noinspection BadExpressionStatementJS
    ctx.writeInline('document.write("<iframe><script><\\/script></iframe>")');
  });

  testWrite('textarea with script content', function(ctx) {
    //noinspection BadExpressionStatementJS
    ctx.writeInline('document.write("<textarea><script><\\/script></textarea>")');
  });

  test('naked remote write', function() {
    var div = document.createElement('div');
    div.id = 'naked-remote-write';
    document.body.appendChild(div);
    stop();
    postscribe('#naked-remote-write', '<script src="remote/write-div.js"></script>', function() {
      ok(true);
      start();
    });
  });

});

