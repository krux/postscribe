//     postscribe.js 1.4.0
//     (c) Copyright 2012-2015 to the present, Krux
//     postscribe is freely distributable under the MIT license.
//     For all details and documentation:
//     http://krux.github.io/postscribe

var WriteStream = require('./WriteStream.js');
var objectAssign = require('object-assign');
var helpers = require('./helpers.js');

// A function that intentionally does nothing.
function doNothing() {}

var isFunction = helpers.isFunction;
var toArray = helpers.toArray;
var defaults = helpers.defaults;
var last = helpers.last;

// Available options and defaults.
var OPTIONS = {
  // Called when an async script has loaded.
  afterAsync: doNothing,
  // Called immediately before removing from the write queue.
  afterDequeue: doNothing,
  // Called sync after a stream's first thread release.
  afterStreamStart: doNothing,
  // Called after writing buffered document.write calls.
  afterWrite: doNothing,
  // Allows disabling the autoFix feature of htmlParser
  autoFix: true,
  // Called immediately before adding to the write queue.
  beforeEnqueue: doNothing,
  // Called before writing a token.
  beforeWriteToken: function(tok) { return tok; },
  // Called before writing buffered document.write calls.
  beforeWrite: function(str) { return str; },
  // Called when evaluation is finished.
  done: doNothing,
  // Called when a write results in an error.
  error: function(e) { throw e; },
  // Whether to let scripts w/ async attribute set fall out of the queue.
  releaseAsync: false
};

// Public-facing interface and queuing
module.exports = (function() {
  var nextId = 0;

  var queue = [];

  var active = null;

  function nextStream() {
    var args = queue.shift();
    var options;
    if(args) {
      options = last(args);
      options.afterDequeue();
      args.stream = runStream.apply(null, args);
      options.afterStreamStart();
    }
  }

  function runStream(el, html, options) {
    active = new WriteStream(el, options);

    // Identify this stream.
    active.id = nextId++;
    active.name = options.name || active.id;
    postscribe.streams[active.name] = active;

    // Override document.write.
    var doc = el.ownerDocument;

    var stash = {
      close: doc.close,
      open: doc.open,
      write: doc.write,
      writeln: doc.writeln
    };

    function write(str) {
      str = options.beforeWrite(str);
      active.write(str);
      options.afterWrite(str);
    }

    objectAssign(doc, {
      close: doNothing,
      open: doNothing,
      write: function(){
        return write(toArray(arguments).join(''));
      },
      writeln: function() {
        return write(toArray(arguments).join('') + '\n');
      }
    });

    // Override window.onerror
    var oldOnError = active.win.onerror || doNothing;

    // This works together with the try/catch around WriteStream::insertScript
    // In modern browsers, exceptions in tag scripts go directly to top level
    active.win.onerror = function(msg, url, line) {
      options.error({ msg: msg + ' - ' + url + ':' + line });
      oldOnError.apply(active.win, arguments);
    };

    // Write to the stream
    active.write(html, function streamDone() {
      // restore document.write
      objectAssign(doc, stash);

      // restore window.onerror
      active.win.onerror = oldOnError;

      options.done();
      active = null;
      nextStream();
    });

    return active;
  }

  function postscribe(el, html, options) {
    if(isFunction(options)) {
      options = { done: options };
    }
    options = defaults(options, OPTIONS);

    el =
      // id selector
      (/^#/).test(el) ? global.document.getElementById(el.substr(1)) :
      // jquery object. TODO: loop over all elements.
      el.jquery ? el[0] : el;


    var args = [el, html, options];

    el.postscribe = {
      cancel: function() {
        if(args.stream) {
          // TODO: implement this
          args.stream.abort();
        } else {
          args[1] = doNothing;
        }
      }
    };

    options.beforeEnqueue(args);
    queue.push(args);

    if(!active) {
      nextStream();
    }

    return el.postscribe;
  }

  return objectAssign(postscribe, {
    htmlParser: require('./htmlParser.js'),
    // Streams by name.
    streams: {},
    // Queue of streams.
    queue: queue,
    // Expose internal classes.
    WriteStream: WriteStream
  });
})();
