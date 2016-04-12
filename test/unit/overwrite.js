/* global $,postscribe,ok,start,asyncTest */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('document.write overwriting.');

  const readNativeDocumentMethodString = method => {
    // Cache because this takes a long time.
    let cache = readNativeDocumentMethodString.cache;
    if (!cache) {
      cache = readNativeDocumentMethodString.cache = {};
    }
    let result = cache[method];
    if (result) {
      return result;
    }
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    result = cache[method] = String(iframe.contentDocument[method]);
    iframe.parentNode.removeChild(iframe);
    return result;
  };

  let isNative = method => {
    return String(document[method]) === readNativeDocumentMethodString(method);
  };

  // Must be async to avoid polluting doc.write for the next tests.
  asyncTest('overrides document.write for normal scripts.', 2, () => {
    ok(isNative('write'));
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      done: start
    });
    ok(!isNative('write'));
  });

  asyncTest('does not override document.write for async scripts.', 2, () => {
    ok(isNative('write'));
    postscribe(document.body, '<script async src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      done: start
    });
    ok(isNative('write'));
  });

  asyncTest('afterAsync fires when async ignored.', 1, () => {
    postscribe(document.body, '<script async src="remote/describe-write.js"></script>', {
      releaseAsync: false,
      afterAsync: () => {
        ok(1);
        start();
      }
    });
  });

  asyncTest('afterAsync fires when no async attr ignored.', 1, () => {
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      afterAsync: () => {
        ok(1);
        start();
      }
    });
  });

  asyncTest('overrides and returns writeln, open, and close', () => {
    function all(assertion) {
      var methods = ['writeln', 'open', 'close'];
      for (var i = 0, len = methods.length; i < len; ++i) {
        assertion(isNative(methods[i]));
      }
    }

    all(ok);
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      afterAsync: () => {
        all(ok);
        start();
      }
    });
    all(val => ok(!val));
  });

});

