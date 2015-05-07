// An html parser written in JavaScript
// Based on http://ejohn.org/blog/pure-javascript-html-parser/
//TODO(#39)
/*globals console:false*/
(function() {
  var supports = (function() {
    var supports = {};

    var html;
    var work = this.document.createElement('div');

    html = '<P><I></P></I>';
    work.innerHTML = html;
    supports.tagSoup = work.innerHTML !== html;

    work.innerHTML = '<P><i><P></P></i></P>';
    supports.selfClose = work.childNodes.length === 2;

    return supports;
  })();



  // Regular Expressions for parsing tags and attributes
  var startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
  var endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/;
  var attr = /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g;
  var fillAttr = /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;

  var DEBUG = false;

  function htmlParser(stream, options) {
    stream = stream || '';

    // Options
    options = options || {};

    for(var key in supports) {
      if(supports.hasOwnProperty(key)) {
        if(options.autoFix) {
          options['fix_'+key] = true;//!supports[key];
        }
        options.fix = options.fix || options['fix_'+key];
      }
    }

    var stack = [];

    // Cache div element for unescaping html entities
    var el = document.createElement('div');

    var unescapeHTMLEntities = function(html) {
      if ( (typeof html === 'string') && (html.indexOf('&') !== -1) ) {
        el.innerHTML = html;
        // ie and ff differ
        return el.textContent || el.innerText || html;
      }
      else {
        return html;
      }
    };

    var append = function(str) {
      stream += str;
    };

    var prepend = function(str) {
      stream = str + stream;
    };

    // Order of detection matters: detection of one can only
    // succeed if detection of previous didn't
    var detect = {
      comment: /^<!--/,
      endTag: /^<\//,
      atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
      startTag: /^</,
      chars: /^[^<]/
    };

    // Detection has already happened when a reader is called.
    var reader = {

      comment: function() {
        var index = stream.indexOf('-->');
        if ( index >= 0 ) {
          return {
            content: stream.substr(4, index-1),
            length: index + 3
          };
        }
      },

      endTag: function() {
        var match = stream.match( endTag );

        if ( match ) {
          return {
            tagName: match[1],
            length: match[0].length
          };
        }
      },

      atomicTag: function() {
        var start = reader.startTag();
        if(start) {
          var rest = stream.slice(start.length);
          // for optimization, we check first just for the end tag
          if(rest.match(new RegExp('<\/\\s*' + start.tagName + '\\s*>', 'i'))) {
            // capturing the content is inefficient, so we do it inside the if
            var match = rest.match(new RegExp('([\\s\\S]*?)<\/\\s*' + start.tagName + '\\s*>', 'i'));
            if(match) {
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

      startTag: function() {

        var endTagIndex = stream.indexOf('>');
        if(endTagIndex === -1) {
          return null; //avoid the match statement if there will be no match
        }

        var match = stream.match( startTag );

        if ( match ) {
          var attrs = {};
          var booleanAttrs = {};
          var rest = match[2];

          match[2].replace(attr, function(match, name) {
            if (!(arguments[2] || arguments[3] || arguments[4] || arguments[5])) {
              attrs[name] = null;
            } else if (arguments[5]) {
              attrs[arguments[5]] = '';
              booleanAttrs[name] = true;
            } else {
              var value = arguments[2] || arguments[3] || arguments[4] ||
                fillAttr.test(name) && name || '';
              attrs[name] = unescapeHTMLEntities(value);
            }
            rest = rest.replace(match, '');
          });

          return {
            tagName: match[1],
            attrs: attrs,
            booleanAttrs: booleanAttrs,
            rest: rest,
            unary: !!match[3],
            length: match[0].length
          };
        }
      },

      chars: function() {
        var index = stream.indexOf('<');
        return {
          length: index >= 0 ? index : stream.length
        };
      }
    };

    var readToken = function() {

      // Enumerate detects in order
      for (var type in detect) {

        if(detect[type].test(stream)) {
          if(DEBUG) { console.log('suspected ' + type); }

          var token = reader[type]();
          if(token) {
            if(DEBUG) { console.log('parsed ' + type, token); }
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
    };

    var readTokens = function(handlers) {
      var tok;
      while((tok = readToken())) {
        // continue until we get an explicit "false" return
        if(handlers[tok.type] && handlers[tok.type](tok) === false) {
          return;
        }
      }
    };

    var clear = function() {
      var rest = stream;
      stream = '';
      return rest;
    };

    var rest = function() {
      return stream;
    };

    if(options.fix) {
      (function() {
        // Empty Elements - HTML 4.01
        var EMPTY = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;

        // Elements that you can| intentionally| leave open
        // (and which close themselves)
        var CLOSESELF = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;


        var stack = [];
        stack.last = function() {
          return this[this.length - 1];
        };
        stack.lastTagNameEq = function(tagName) {
          var last = this.last();
          return last && last.tagName &&
            last.tagName.toUpperCase() === tagName.toUpperCase();
        };

        stack.containsTagName = function(tagName) {
          for(var i = 0, tok; (tok = this[i]); i++) {
            if(tok.tagName === tagName) {
              return true;
            }
          }
          return false;
        };

        var correct = function(tok) {
          if(tok && tok.type === 'startTag') {
            // unary
            tok.unary = EMPTY.test(tok.tagName) || tok.unary;
            tok.html5Unary = !/\/>$/.test(tok.text);
          }
          return tok;
        };

        var readTokenImpl = readToken;

        var peekToken = function() {
          var tmp = stream;
          var tok = correct(readTokenImpl());
          stream = tmp;
          return tok;
        };

        var closeLast = function() {
          var tok = stack.pop();

          // prepend close tag to stream.
          prepend('</'+tok.tagName+'>');
        };

        var handlers = {
          startTag: function(tok) {
            var tagName = tok.tagName;
            // Fix tbody
            if(tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
              prepend('<TBODY>');
              prepareNextToken();
            } else if(options.fix_selfClose && CLOSESELF.test(tagName) && stack.containsTagName(tagName)) {
              if(stack.lastTagNameEq(tagName)) {
                closeLast();
              } else {
                prepend('</'+tok.tagName+'>');
                prepareNextToken();
              }
            } else if (!tok.unary) {
              stack.push(tok);
            }
          },

          endTag: function(tok) {
            var last = stack.last();
            if(last) {
              if(options.fix_tagSoup && !stack.lastTagNameEq(tok.tagName)) {
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

        var skipToken = function() {
          // shift the next token
          readTokenImpl();

          prepareNextToken();
        };

        var prepareNextToken = function() {
          var tok = peekToken();
          if(tok && handlers[tok.type]) {
            handlers[tok.type](tok);
          }
        };

        // redefine readToken
        readToken = function() {
          prepareNextToken();
          return correct(readTokenImpl());
        };
      })();
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
    var handler = {
      comment: function(tok) {
        return '<!--' + tok.content;
      },
      endTag: function(tok) {
        return '</'+tok.tagName+'>';
      },
      atomicTag: function(tok) {
        if(DEBUG) { console.log(tok); }
        return handler.startTag(tok) +
              tok.content +
              handler.endTag(tok);
      },
      startTag: function(tok) {
        var str = '<'+tok.tagName;
        for (var key in tok.attrs) {
          str += ' '+key;
          
          var val = tok.attrs[key];
          if (typeof tok.booleanAttrs == 'undefined' || typeof tok.booleanAttrs[key] == 'undefined') {
            // escape quotes
            str += '="'+(val ? val.replace(/(^|[^\\])"/g, '$1\\\"') : '')+'"';
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
    var escapedAttrs = {};
    // escape double-quotes for writing html as a string

    for(var name in attrs) {
      var value = attrs[name];
      escapedAttrs[name] = value && value.replace(/(^|[^\\])"/g, '$1\\\"');
    }
    return escapedAttrs;
  };

  for(var key in supports) {
    htmlParser.browserHasFlaw = htmlParser.browserHasFlaw || (!supports[key]) && key;
  }

  this.htmlParser = htmlParser;
})();
