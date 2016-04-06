$(document).ready(function() {

  // document.write (script) tests
  module('document.write');

  testWrite('remainder', function(ctx) {
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
    ctx.write('A<script src="remote/write-remote-and-inline-script.js">');
    ctx.write('</script>B');
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
  });

  testWrite('docwrite outside parent of script', function(ctx) {
    ctx.write('<div>A<script type="text/javascript">document.write("B</div>C");</script>D');
  });

  testWrite('capital script', function(ctx) {
    ctx.write('A<SCRIPT type="text/javascript">document.write("B");</SCRIPT>C');
  });

  testWrite('different case script', function(ctx) {
    ctx.write('A<SCRIPT type="text/javascript">document.write("B");</script>C');
  });

  testWrite('capital script@SRC', function(ctx) {
    ctx.write('<SCRIPT TYPE="text/javascript" SRC="remote/write-div.js"></SCRIPT>');
  });

  testWrite('inline', function(ctx) {
    ctx.write('A<script type="text/javascript">document.write("B");</script>C');
  });

  testWrite('nested document.write', function(ctx) {
    // document.write calls document.write!
    var inner = "B<script type='text/javascript'>document.write('C');<\\/script>D";
    ctx.write('A<script type="text/javascript">document.write("' + inner + '");</script>E');
  });

  testWrite('globals', function(ctx) {
    ctx.write('<script>var XQWER = "foo";</script><script>document.write("" + window.XQWER + (this === window) + (window === top));</script>');
  });

  // Native doesn't seem to support this!
  skip(testWrite)('partial script', function(ctx) {
    ctx.write('<script>var QWVES = 1');
    ctx.write('7;</script>');
    ctx.write('<script>document.write(QWVES);</script>');
  });

  testWrite('remote then write', function(ctx) {
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('double remote', function(ctx) {
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
    ctx.writeRemote('remote/write-div.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote then remote then write', function(ctx) {
    ctx.writeRemote('remote/write-remote-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote => (remote and inline), write', function(ctx) {
    ctx.writeRemote('remote/write-remote-and-inline-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  testWrite('remote then inline then write', function(ctx) {
    ctx.writeRemote('remote/write-inline-script.js');
    ctx.write('<div id="local">Local</div>');
  });

  // IE natively does this wrong. It uses the inline global instead of the remote one.
  testWrite('remote + global', function(ctx) {
    ctx.writeInline('var global1 = "inline global1"');
    ctx.writeRemote('remote/set-global1.js');
    ctx.writeInline('document.write(this.global1);');
  });

  testWrite('corrupt src', function(ctx) {
    ctx.write('<img src"abc.jpg"><div>WORKS</div>');
  });

  // HTML Escaped Entities check issue #81 fix
  testWrite('Escaped HTML Entity script entity name', function(ctx) {
    ctx.write('<script type="text/javascript" src="remote/write-using-query-string.js?k=1&k2=2"></script>');
  });

  // general html entity checking
  testWrite('HTML entity text to write', function(ctx) {
    ctx.write('<span><p>foo&amp;&#47;&#x00024;</p></span>');
  });

});

