import WriteStream from './write-stream';
import * as utils from './utils';

/**
 * A function that intentionally does nothing.
 */
function doNothing() {
}

/**
 * Available options and defaults.
 *
 * @type {Object}
 */
const OPTIONS = {
  /**
   * Called when an async script has loaded.
   */
  afterAsync: doNothing,

  /**
   * Called immediately before removing from the write queue.
   */
  afterDequeue: doNothing,

  /**
   * Called sync after a stream's first thread release.
   */
  afterStreamStart: doNothing,

  /**
   * Called after writing buffered document.write calls.
   */
  afterWrite: doNothing,

  /**
   * Allows disabling the autoFix feature of prescribe
   */
  autoFix: true,

  /**
   * Called immediately before adding to the write queue.
   */
  beforeEnqueue: doNothing,

  /**
   * Called before writing a token.
   *
   * @param {Object} tok The token
   */
  beforeWriteToken: tok => tok,

  /**
   * Called before writing buffered document.write calls.
   *
   * @param {String} str The string
   */
  beforeWrite: str => str,

  /**
   * Called when evaluation is finished.
   */
  done: doNothing,

  /**
   * Called when a write results in an error.
   *
   * @param {Error} e The error
   */
  error(e) { throw new Error(e.msg); },

  /**
   * Whether to let scripts w/ async attribute set fall out of the queue.
   */
  releaseAsync: false
};

let nextId = 0;
let queue = [];
let active = null;

function nextStream() {
  const args = queue.shift();
  if (args) {
    const options = utils.last(args);

    options.afterDequeue();
    args.stream = runStream(...args);
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
  const doc = el.ownerDocument;

  const stash = {
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

  Object.assign(doc, {
    close: doNothing,
    open: doNothing,
    write: (...str) => write(str.join('')),
    writeln: (...str) => write(str.join('') + '\n')
  });

  // Override window.onerror
  const oldOnError = active.win.onerror || doNothing;

  // This works together with the try/catch around WriteStream::insertScript
  // In modern browsers, exceptions in tag scripts go directly to top level
  active.win.onerror = (msg, url, line) => {
    options.error({msg: `${msg} - ${url}: ${line}`});
    oldOnError.apply(active.win, [msg, url, line]);
  };

  // Write to the stream
  active.write(html, () => {
    // restore document.write
    Object.assign(doc, stash);

    // restore window.onerror
    active.win.onerror = oldOnError;

    options.done();
    active = null;
    nextStream();
  });

  return active;
}

export default function postscribe(el, html, options) {
  if (utils.isFunction(options)) {
    options = {done: options};
  } else if (options === 'clear') {
    queue = [];
    active = null;
    nextId = 0;
    return;
  }

  options = utils.defaults(options, OPTIONS);

  // id selector
  if ((/^#/).test(el)) {
    el = window.document.getElementById(el.substr(1));
  } else {
    el = el.jquery ? el[0] : el;
  }

  const args = [el, html, options];

  el.postscribe = {
    cancel: () => {
      if (args.stream) {
        args.stream.abort();
      } else {
        args[1] = doNothing;
      }
    }
  };

  options.beforeEnqueue(args);
  queue.push(args);

  if (!active) {
    nextStream();
  }

  return el.postscribe;
}

Object.assign(postscribe, {
  // Streams by name.
  streams: {},
  // Queue of streams.
  queue,
  // Expose internal classes.
  WriteStream
});
