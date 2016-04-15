/* global $,postscribe,test,ok,start,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  QUnit.module('Tag Soup');
  setOptions({});

  testWrite('TS1', ctx => {
    ctx.write('<div><i></div>');
    ctx.write('foo');
  });

  testWrite('TS2', ctx => {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
    ctx.write('<div><i>');
  });

  testWrite('foo should be italicized', ctx => {
    ctx.write('<div><i>');
    ctx.write('<div>foo');
  });

  testWrite('inside-out i/p', ctx => {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo');
  });

  testWrite('TS5', ctx => {
    ctx.write('<div><i></div>');
  });

  testWrite('TS6', ctx => {
    ctx.write('<div><i></div>');
    ctx.write('<div>foo<i>');
    ctx.write('</div>bar');
  });

  testWrite('character placeholders', ctx => {
    ctx.write('<div><div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar</div>');
  });

  testWrite('just a close tag', ctx => {
    ctx.write('</i>');
  });

  testWrite('TS9', ctx => {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>');
    ctx.write('</i>');
  });

  testWrite('TS10', ctx => {
    ctx.write('<div><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar');
    ctx.write('</i>');
  });

  testWrite('TS11', ctx => {
    ctx.write('<div><b><i></div>');
    ctx.write('foo');
    ctx.write('<div>bar<i>');
    ctx.write('</b>bla');
  });

  testWrite('random stuff', ctx => {
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

  testWrite('iframe with script content', ctx => {
    ctx.writeInline('document.write("<iframe><script><\\/script></iframe>")');
  });

  testWrite('textarea with script content', ctx => {
    ctx.writeInline('document.write("<textarea><script><\\/script></textarea>")');
  });

  test('naked remote write', () => {
    const div = document.createElement('div');
    div.id = 'naked-remote-write';
    document.body.appendChild(div);
    stop();
    postscribe('#naked-remote-write', '<script src="remote/write-div.js"></script>', function() {
      ok(true);
      start();
    });
  });

});

