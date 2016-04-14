/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  QUnit.module('style');
  setOptions({});

  testWrite('simple style', ctx => {
    ctx.write('<style type="text/css">#test_style {' +
      'background:blue;' +
      'width:200px;' +
      'height:300px;' +
      'border: 2px solid red;' +
      '}</style>' +
      '<div id="test_style">' +
      '<img src="http://lorempixel.com/100/80/sports/"/>' +
      '</div>');
  });

});

