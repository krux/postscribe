import {Html, Js, Uri} from './write-thunks'

/**
 * A map between description and HTML to compare. Each entry will be run through both document.write and postscribe.
 */
export default {
  attr: {
    //'string double quote': new Html('<img alt="foo">'),
    //'string single quote': new Html("<img alt='foo'>"),
    //'string unquoted': new Html('<img alt=foo>'),
    //'empty string': new Html('<img alt="">'),
    //'no value': new Html('<input type="checkbox" checked>'),
    //'self closing': new Html('<div class="foo"/>')
  },
  docwrite: {
    remainder: [
      new Uri('remote/write-remote-and-inline-script.js'),
      new Html('A<script src="remote/write-remote-and-inline-script.js">'),
      new Html('</script>B'),
      new Uri('remote/write-remote-and-inline-script.js')
    ],
    'docwrite outside parent of script': new Html('<div>A<script type="text/javascript">document.write("B</div>C");</script>D'),
    'capital script': new Html('A<SCRIPT type="text/javascript">document.write("B");</SCRIPT>C'),
    'different case script': new Html('A<SCRIPT type="text/javascript">document.write("B");</script>C'),
    'capital script@SRC': new Html('<SCRIPT TYPE="text/javascript" SRC="remote/write-div.js"></SCRIPT>'),
    'inline': new Html('A<script type="text/javascript">document.write("B");</script>C'),
    'nested document.write': (() => {
      const inner = "B<script type='text/javascript'>document.write('C');<\\/script>D";
      return 'A<script type="text/javascript">document.write(" + inner + ");</script>E';
    })(),
    'globals': new Html('<script>var XQWER = "foo";</script><script>document.write("" + window.XQWER + (this === window) + (window === top));</script>'),
    'partial script': [
      new Html('<script>var QWVES = 1'),
      new Html('7;</script>'),
      new Html('<script>document.write(QWVES);</script>')
    ],
    'remote then write': [
      new Uri('remote/write-div.js'),
      new Html('<div id="local">Local</div>')
    ],
    'double remote': [
      new Uri('remote/write-div.js'),
      new Html('<div id="local">Local</div>'),
      new Uri('remote/write-div.js'),
      new Html('<div id="local">Local</div>')
    ],
    'remote 2x then write': [
      new Uri('remote/write-div.js'),
      new Uri('remote/write-div.js'),
      new Html('<div id="local">Local</div>')
    ],
    'remote => (remote and inline), write': [
      new Uri('remote/write-remote-and-inline-script.js'),
      new Html('<div id="local">Local</div>')
    ],
    'remote then inline then write': [
      new Uri('remote/write-inline-script.js'),
      new Html('<div id="local">Local</div>')
    ],
    'remote + global': [
      new Js('var global1 = "inline global1"'),
      new Uri('remote/set-global1.js'),
      new Js('document.write(this.global1);')
    ],
    'corrupt src': new Html('<img src"abc.jpg"><div>WORKS</div>'),
    'Escaped HTML Entity script entity name': new Html('<script type="text/javascript" src="remote/write-using-query-string.js?k=1&k2=2"></script>'),
    'HTML entity text to write': new Html('<span><p>foo&amp;&#47;&#x00024;</p></span>'),
    'remote with params then write (use network observer)': [
      new Uri('remote/write-div.js?id=1234&section=test'),
      new Html('<div id="local">Local</div>')
    ],
    'remote then remote then write with params (use network observer)': [
      new Uri('remote/write-remote-script-with-params.js?id=1234&section=test'),
      new Html('<div id="local">Local</div>')
    ]
  },
  'writeln with multiple arguments': {
    'wlma: split mid-element': [
      new Html('<i', true), new Html('mg alt="foo">')
    ],
    'wlma: split mid-attribute': [
      new Html('<img a', true), new Html('lt="foo">')
    ],
    'wlma: split mid-attribute-value': [
      new Html('<img alt="f', true), new Html('oo">', true)
    ]
  }
};
