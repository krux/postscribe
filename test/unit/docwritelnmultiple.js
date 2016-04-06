$(document).ready(function() {

  module('writeln with multiple arguments');
  setOptions({});

  testWrite('wlma: split mid-element', function(ctx) {
    ctx.writeln('<i', 'mg alt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: split mid-attribute', function(ctx) {
    ctx.writeln('<img a', 'lt="foo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: split mid-attribute-value', function(ctx) {
    ctx.writeln('<img alt="f', 'oo">');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: empty strings', function(ctx) {
    ctx.writeln('', '<im', '', 'g ', '', 'al', '', 't="f', '', 'oo">', '');
    ctx.eq($('img', ctx.doc).attr('alt'));
  });

  testWrite('wlma: docwrite outside parent of script', function(ctx) {
    ctx.writeln('<div>A<script type="', 'text/javascript">\n',
        'doc', 'ument.write("B</div>C");\n</script>D');
  });

  testWrite('wlma: SW9', function(ctx) {
    ctx.writeln('<div><i></i></div>', 'foo', '<div>bar', '<i></i>');
  });

  testWrite('wlma: SW10', function(ctx) {
    ctx.writeln('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla');
  });

  testWrite('wlma: TS2', function(ctx) {
    ctx.writeln('<div><i>', '<div>foo', '<div><i>');
  });

});

