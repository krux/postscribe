/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

// An html parser written in JavaScript
// Based on http://ejohn.org/blog/pure-javascript-html-parser/

const supports = (function() {
  const supports = {};

  let html;
  const work = window.document.createElement('div');

  try {
    html = '<P><I></P></I>';
    work.innerHTML = html;
    supports.tagSoup = work.innerHTML !== html;
  } catch (e) {
    supports.tagSoup = false;
  }

  try {
    work.innerHTML = '<P><i><P></P></i></P>';
    supports.selfClose = work.childNodes.length === 2;
  } catch (e) {
    supports.selfClose = false;
  }

  return supports;
}());

// Regular Expressions for parsing tags and attributes
const startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
const endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/;
const attr = /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g;
const fillAttr = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;

export default function htmlParser(stream, options) {
  stream = stream || '';

  // Options
  options = options || {};

  for (let key in supports) {
    if (supports.hasOwnProperty(key)) {
      if (options.autoFix) {
        options['fix_' + key] = true; // !supports[key];
      }
      options.fix = options.fix || options['fix_' + key];
    }
  }

  const stack = [];

  function append(str) {
    stream += str;
  }

  function prepend(str) {
    stream = str + stream;
  }

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

    comment: () => {
      const index = stream.indexOf('-->');
      if (index >= 0) {
        return {
          content: stream.substr(4, index - 1),
          length: index + 3
        };
      }
    },

    endTag: () => {
      const match = stream.match(endTag);

      if (match) {
        return {
          tagName: match[1],
          length: match[0].length
        };
      }
    },

    atomicTag: () => {
      const start = reader.startTag();
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

    startTag: () => {

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
            const value = arguments[2] || arguments[3] || arguments[4] ||
              fillAttr.test(name) && name || '';
            attrs[name] = value;
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

    chars: () => {
      const index = stream.indexOf('<');
      return {
        length: index >= 0 ? index : stream.length
      };
    }
  };

  function readToken() {

    // Enumerate detects in order
    for (let type in detect) {
      if (detect[type].test(stream)) {
        console.log('suspected ' + type); // eslint-disable-line no-console

        const token = reader[type]();
        if (token) {
          console.log('parsed ' + type, token); // eslint-disable-line no-console

          // Type
          token.type = token.type || type;
          // Entire text
          token.text = stream.substr(0, token.length);
          // Update the stream
          stream = stream.slice(token.length);

          return token;
        }
        return null;
      }
    }
  }

  function readTokens(handlers) {
    let tok;
    while ((tok = readToken())) {
      // continue until we get an explicit "false" return
      if (handlers[tok.type] && handlers[tok.type](tok) === false) {
        return;
      }
    }
  }

  function clear() {
    const rest = stream;
    stream = '';
    return rest;
  }

  function rest() {
    return stream;
  }

  if (options.fix) {
    (function() {
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

      let readTokenImpl = readToken;

      function peekToken() {
        const tmp = stream;
        const tok = correct(readTokenImpl());
        stream = tmp;
        return tok;
      }

      function closeLast() {
        const tok = stack.pop();

        // prepend close tag to stream.
        prepend('</' + tok.tagName + '>');
      }

      const handlers = {
        startTag: function(tok) {
          const tagName = tok.tagName;
          // Fix tbody
          if (tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
            prepend('<TBODY>');
            prepareNextToken();
          } else if (options.fix_selfClose && CLOSESELF.test(tagName) && stack.containsTagName(tagName)) {
            if (stack.lastTagNameEq(tagName)) {
              closeLast();
            } else {
              prepend('</' + tok.tagName + '>');
              prepareNextToken();
            }
          } else if (!tok.unary) {
            stack.push(tok);
          }
        },

        endTag: function(tok) {
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
        readTokenImpl();

        prepareNextToken();
      }

      function prepareNextToken() {
        const tok = peekToken();
        if (tok && handlers[tok.type]) {
          handlers[tok.type](tok);
        }
      }

      // redefine readToken
      readToken = () => {
        prepareNextToken();
        return correct(readTokenImpl());
      };
    }());
  }

  return {
    append: append,
    readToken: readToken,
    readTokens: readTokens,
    clear: clear,
    rest: rest,
    stack: stack
  };

}

htmlParser.supports = supports;

htmlParser.tokenToString = function(tok) {
  const handler = {
    comment: function(tok) {
      return '<!--' + tok.content;
    },
    endTag: function(tok) {
      return '</' + tok.tagName + '>';
    },
    atomicTag: function(tok) {
      console.log(tok); // eslint-disable-line no-console

      return handler.startTag(tok) +
          tok.content +
          handler.endTag(tok);
    },
    startTag: function(tok) {
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
    chars: function(tok) {
      return tok.text;
    }
  };
  return handler[tok.type](tok);
};

htmlParser.escapeAttributes = function(attrs) {
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
    htmlParser.browserHasFlaw = htmlParser.browserHasFlaw || (!supports[key]) && key;
  }
}
