import {Html, Js, Uri} from '../helpers/write-thunks';


/**
 * A map between description and HTML to compare. Each entry will be run through both document.write and postscribe.
 */
export default {
  attr: {
    'string double quote': new Html('<img alt="foo">'),
    'string single quote': new Html("<img alt='foo'>").escape(),
    'string unquoted': new Html('<img alt=foo>'),
    'empty string': new Html('<img alt="">'),
    'no value': new Html('<input type="checkbox" checked>'),
    'self closing': new Html('<div class="foo"/>')
  },
  docwrite: {
    'remainder': [
      new Uri('remote/write-remote-and-inline-script.js'),
      new Html('A<script src="remote/write-remote-and-inline-script.js">', '</script>B'),
      new Uri('remote/write-remote-and-inline-script.js')
    ],
    'docwrite outside parent of script': new Html(`<div>A<script type="text/javascript">document.write("B</div>C");<\/script>D`),
    'capital script': new Html('A<SCRIPT type="text/javascript">document.write("B");</SCRIPT>C'),
    'different case script': new Html('A<SCRIPT type="text/javascript">document.write("B");</script>C'),
    'capital script@SRC': new Html('<SCRIPT TYPE="text/javascript" SRC="remote/write-div.js"></SCRIPT>'),
    'inline': new Html('A<script type="text/javascript">document.write("B");</script>C'),
    'nested document.write': `A<script type="text/javascript">document.write("B<script type='text/javascript'>document.write('C');<\\/script>D");</script>E`,
    'globals': '<script>var XQWER = "foo";<\/script><script>document.write("" + window.XQWER + (this === window));<\/script>',
    'skip:partial script': [
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
    'skip:corrupt src': '<img src"abc.jpg"><div>WORKS</div>',
    'Escaped HTML Entity script entity name': '<script type="text/javascript" src="remote/write-using-query-string.js?k=1&k2=2"></script>',
    'HTML entity text to write': '<span><p>foo&amp;&#47;&#x00024;</p></span>',
    'remote with params then write (use network observer)': [
      new Uri('remote/write-div.js?id=1234&section=test'),
      '<div id="local">Local</div>'
    ],
    'remote then remote then write with params (use network observer)': [
      new Uri('remote/write-remote-script-with-params.js?id=1234&section=test'),
      '<div id="local">Local</div>'
    ]
  },
  'writeln with multiple arguments': {
    'wlma: split mid-element': [
      new Html('<i', 'mg alt="foo">').asWriteln()
    ],
    'wlma: split mid-attribute': [
      new Html('<img a', 'lt="foo">').asWriteln()
    ],
    'wlma: split mid-attribute-value': [
      new Html('<img alt="f', 'oo">').asWriteln()
    ],
    'wlma: empty strings': [
      new Html('', '<im', '', 'g ', '', 'al', '', 't="f', '', 'oo">', '').asWriteln()
    ],
    'wlma: docwrite outside parent of script': [
      new Html('<div>A<script data-remove type="', 'text/javascript">\n', 'doc', 'ument.write("B</div>C");\n</script>D').asWriteln()
    ],
    'wlma: SW9': [
      new Html('<div><i></i></div>', 'foo', '<div>bar', '<i></i>').asWriteln()
    ],
    'wlma: SW10': [
      new Html('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla').asWriteln()
    ],
    'wlma: TS2': [
      new Html('<div><i>', '<div>foo', '<div><i>').asWriteln()
    ]
  },
  multiple: {
    'MULT1': [
      new Uri('remote/write-remote-script.js'),
      '<div id="local">Local</div>'
    ]
  },
  'complete node after several writes': {
    'writes JS inside tag': '<script src="remote/write-multi-script.js"><\/script>',
    'writes CSS inside tag': '<script src="remote/write-multi-style.js"><\/script>',
    'writes textarea inside tag': '<script src="remote/write-multi-style.js"><\/script>',
    'writes iframe inside tag': '<script src="remote/write-multi-style.js"><\/script>',
    'writes noscript inside tag': '<script src="remote/write-multi-style.js"><\/script>',
    'writes text inside tag': '<script src="remote/write-multi-div.js"><\/script>'
  },
  'nesting scripts': {
    // Broken in IE10 see: https://github.com/krux/postscribe/issues/154
    'skip:script written within another should complete': "<script>document.write('<script type=\"text/javascript\" src=\"remote/write-using-query-string.js?k=1&k2=2\"><\\/script>')<\/script>"
  },
  simplewrites: {
    'empty tag': new Html('<span>A<input name="B">C</span>D'),
    'SW1': new Html('<div>', '<i>foo'),
    'SW2': new Html('<div><i', '>foo'),
    'SW2-b': new Html('<div>foo', '<div>bar'),
    'SW3': new Html('<div><i>foo', '</i><div>bar'),
    'SW4': new Html('<div><i></i></div>', '<div>foo'),
    'SW5': new Html('<div><i></i></div>foo'),
    'SW6': new Html('<div><i></i></div>', '<div>foo<i', '></i></div>bar'),
    'SW7': new Html('<div><div><i></i></div>', 'foo', '<div>bar</div>'),
    'SW8': new Html('<div><i></i></div>', 'foo', '<div>', '<i></i>'),
    'SW9': new Html('<div><i></i></div>', 'foo', '<div>bar', '<i></i>'),
    'SW10': new Html('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla')
  }
};
