$(document).ready(function() {

  // Test simple writing
  module('Self Closing');
  setOptions({});

  testWrite('Handles closed self-closing tags that\'re closed.', function(ctx) {
    ctx.writeln(
        '<div id="first" style="background: red; padding: 5px">' +
        '<embed></embed>' +
        '<div id="second" style="background: yellow">Should be yellow in red box, right?</div>' +
        '</div>'
    );
  });

  testWrite('Handles closed self-closing tags that\'re closed w/ a slash.', function(ctx) {
    ctx.writeln(
        '<div><object><param name="allowFullScreen" value="true" /><param></param></object></div>'
    );
  });

});

