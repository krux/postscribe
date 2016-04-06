$(document).ready(function() {

  module('style');
  setOptions({});

  testWrite('simple style', function(ctx) {
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

