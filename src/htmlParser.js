/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

// An html parser written in JavaScript
// Based on http://ejohn.org/blog/pure-javascript-html-parser/

const DEBUG = false;
const debugLog = (() => {
  if (DEBUG) {
    return console.debug; // eslint-disable-line no-console
  } else {
    return () => {};
  }
})();

const supports = (function() {
  const target = {};

  let html;
  const work = window.document.createElement('div');

  try {
    html = '<P><I></P></I>';
    work.innerHTML = html;
    target.tagSoup = work.innerHTML !== html;
  } catch (e) {
    target.tagSoup = false;
  }

  try {
    work.innerHTML = '<P><i><P></P></i></P>';
    target.selfClose = work.childNodes.length === 2;
  } catch (e) {
    target.selfClose = false;
  }

  return target;
}());

// Regular Expressions for parsing tags and attributes
const startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
const endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/;
const attr = /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g;
const fillAttr = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;

// Order of detection matters: detection of one can only
// succeed if detection of previous didn't
const detect = {
  comment: /^<!--/,
  endTag: /^<\//,
  atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
  startTag: /^</,
  chars: /^[^<]/
};

// Detection has already happened when a reader is called.
const reader = {
  comment: stream => {
    const index = stream.indexOf('-->');
    if (index >= 0) {
      return {
        content: stream.substr(4, index - 1),
        length: index + 3
      };
    }
  },

  endTag: stream => {
    const match = stream.match(endTag);

    if (match) {
      return {
        tagName: match[1],
        length: match[0].length
      };
    }
  },

  atomicTag: stream => {
    const start = reader.startTag(stream);
    if (start) {
      const rest = stream.slice(start.length);
      // for optimization, we check first just for the end tag
      if (rest.match(new RegExp('<\/\\s*' + start.tagName + '\\s*>', 'i'))) {
        // capturing the content is inefficient, so we do it inside the if
        const match = rest.match(new RegExp('([\\s\\S]*?)<\/\\s*' + start.tagName + '\\s*>', 'i'));
        if (match) {
          // good to go
          return {
            tagName: start.tagName,
            attrs: start.attrs,
            content: match[1],
            length: match[0].length + start.length
          };
        }
      }
    }
  },

  startTag: stream => {
    const endTagIndex = stream.indexOf('>');
    if (endTagIndex === -1) {
      return null; // avoid the match statement if there will be no match
    }

    const match = stream.match(startTag);

    if (match) {
      const attrs = {};
      const booleanAttrs = {};
      let rest = match[2];

      match[2].replace(attr, function(match, name) {
        if (!(arguments[2] || arguments[3] || arguments[4] || arguments[5])) {
          attrs[name] = null;
        } else if (arguments[5]) {
          attrs[arguments[5]] = '';
          booleanAttrs[name] = true;
        } else {
          attrs[name] = arguments[2] || arguments[3] || arguments[4] ||
            fillAttr.test(name) && name || '';
        }
        rest = rest.replace(match, '');
      });

      return {
        tagName: match[1],
        attrs,
        booleanAttrs,
        rest,
        unary: !!match[3],
        length: match[0].length
      };
    }
  },

  chars: stream => {
    const index = stream.indexOf('<');
    return {
      length: index >= 0 ? index : stream.length
    };
  }
};

function fixedReadTokenFactory(parser, options) {
  // Empty Elements - HTML 4.01
  const EMPTY = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;

  // Elements that you can| intentionally| leave open
  // (and which close themselves)
  const CLOSESELF = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;

  const stack = [];
  stack.last = function() {
    return this[this.length - 1];
  };

  stack.lastTagNameEq = function(tagName) {
    const last = this.last();
    return last && last.tagName &&
      last.tagName.toUpperCase() === tagName.toUpperCase();
  };

  stack.containsTagName = function(tagName) {
    for (let i = 0, tok; (tok = this[i]); i++) {
      if (tok.tagName === tagName) {
        return true;
      }
    }
    return false;
  };

  function correct(tok) {
    if (tok && tok.type === 'startTag') {
      // unary
      tok.unary = EMPTY.test(tok.tagName) || tok.unary;
      tok.html5Unary = !(/\/>$/).test(tok.text);
    }
    return tok;
  }

  function peekToken() {
    const tmp = parser.stream;
    const tok = correct(parser._readTokenImpl());
    parser.stream = tmp;
    return tok;
  }

  function closeLast() {
    const tok = stack.pop();

    // prepend close tag to stream.
    parser.prepend(`</${tok.tagName}>`);
  }

  const handlers = {
    startTag: tok => {
      const tagName = tok.tagName;
      // Fix tbody
      if (tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
        parser.prepend('<TBODY>');
        prepareNextToken();
      } else if (options.fix_selfClose && CLOSESELF.test(tagName) &&
          stack.containsTagName(tagName)) {
        if (stack.lastTagNameEq(tagName)) {
          closeLast();
        } else {
          parser.prepend('</' + tok.tagName + '>');
          prepareNextToken();
        }
      } else if (!tok.unary) {
        stack.push(tok);
      }
    },

    endTag: tok => {
      const last = stack.last();
      if (last) {
        if (options.fix_tagSoup && !stack.lastTagNameEq(tok.tagName)) {
          // cleanup tag soup
          closeLast();
        } else {
          stack.pop();
        }
      } else if (options.fix_tagSoup) {
        // cleanup tag soup part 2: skip this token
        skipToken();
      }
    }
  };

  function skipToken() {
    // shift the next token
    parser._readTokenImpl();
    prepareNextToken();
  }

  function prepareNextToken() {
    const tok = peekToken();
    if (tok && handlers[tok.type]) {
      handlers[tok.type](tok);
    }
  }

  return () => {
    prepareNextToken();
    return correct(parser._readTokenImpl());
  };
}

export default class HtmlParser {
  constructor(stream = '', options = {}) {
    this.stream = stream;

    for (let key in supports) {
      if (supports.hasOwnProperty(key)) {
        if (options.autoFix) {
          options[`fix_${key}`] = true; // !supports[key];
        }
        options.fix = options.fix || options[`fix_${key}`];
      }
    }

    if (options.fix) {
      this._fixedReadToken = fixedReadTokenFactory(this, options);
    }
  }

  append(str) {
    this.stream += str;
  }

  prepend(str) {
    this.stream = str + this.stream;
  }

  _readTokenImpl() {
    // Enumerate detects in order
    for (let type in detect) {
      if (detect[type].test(this.stream)) {
        debugLog(`suspected ${type}`);

        const token = reader[type](this.stream);
        if (token) {
          debugLog(`parsed ${type}`, token);

          // Type
          token.type = token.type || type;
          // Entire text
          token.text = this.stream.substr(0, token.length);
          // Update the stream
          this.stream = this.stream.slice(token.length);

          return token;
        }
        return null;
      }
    }
  }

  readToken() {
    if (this._fixedReadToken) {
      return this._fixedReadToken();
    } else {
      return this._readTokenImpl();
    }
  }

  readTokens(handlers) {
    let tok;
    while ((tok = this.readToken())) {
      // continue until we get an explicit "false" return
      if (handlers[tok.type] && handlers[tok.type](tok) === false) {
        return;
      }
    }
  }

  clear() {
    const rest = this.stream;
    this.stream = '';
    return rest;
  }

  rest() {
    return this.stream();
  }
}

HtmlParser.supports = supports;

HtmlParser.tokenToString = tok => {
  const handler = {
    comment: tok => {
      return `<!--${tok.content}`;
    },

    endTag: tok => {
      return `</${tok.tagName}>`;
    },

    atomicTag: tok => {
      debugLog(tok);

      return handler.startTag(tok) + tok.content + handler.endTag(tok);
    },

    startTag: tok => {
      let str = '<' + tok.tagName;
      for (let key in tok.attrs) {
        if (tok.attrs.hasOwnProperty(key)) {
          str += ' ' + key;

          const val = tok.attrs[key];
          if (typeof tok.booleanAttrs == 'undefined' || typeof tok.booleanAttrs[key] == 'undefined') {
            // escape quotes
            str += '="' + (val ? val.replace(/(^|[^\\])"/g, '$1\\\"') : '') + '"';
          }
        }
      }

      if (tok.rest) {
        str += tok.rest;
      }
      return str + (tok.unary && !tok.html5Unary ? '/>' : '>');
    },

    chars: tok => {
      return tok.text;
    }
  };

  return handler[tok.type](tok);
};

HtmlParser.escapeAttributes = attrs => {
  const escapedAttrs = {};
  // escape double-quotes for writing html as a string

  for (let name in attrs) {
    if (attrs.hasOwnProperty(name)) {
      const value = attrs[name];
      escapedAttrs[name] = value && value.replace(/(^|[^\\])"/g, '$1\\\"');
    }
  }
  return escapedAttrs;
};

for (let key in supports) {
  if (supports.hasOwnProperty(key)) {
    HtmlParser.browserHasFlaw = HtmlParser.browserHasFlaw || (!supports[key]) && key;
  }
}
