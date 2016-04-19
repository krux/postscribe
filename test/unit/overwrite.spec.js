import postscribe from '../../src/postscribe';

describe('overwrite', () => {
  function readNativeDocumentMethodString(method) {
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
  }

  function isNative(method) {
    return String(document[method]) === readNativeDocumentMethodString(method);
  }

  // Must be async to avoid polluting doc.write for the next tests.
  it('overrides document.write for normal scripts.', done => {
    expect(isNative('write')).to.be.ok();
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      done
    });
    expect(isNative('write')).not.to.be.ok();
  });

  it('does not override document.write for async scripts.', done => {
    expect(isNative('write')).to.be.ok();
    postscribe(document.body, '<script async src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      done
    });
    expect(isNative('write')).not.to.be.ok();
  });

  it('afterAsync fires when async ignored.', done => {
    postscribe(document.body, '<script async src="remote/describe-write.js"></script>', {
      releaseAsync: false,
      afterAsync: () => {
        expect(1);
        done();
      }
    });
  });

  it('afterAsync fires when no async attr ignored.', done => {
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      releaseAsync: true,
      afterAsync: () => {
        expect(1);
        done();
      }
    });
  });

  it('overrides and returns writeln, open, and close', done => {
    function all(assertion = (val => expect(val).to.be.ok())) {
      const methods = ['writeln', 'open', 'close'];
      for (let i = 0, len = methods.length; i < len; ++i) {
        assertion(isNative(methods[i]));
      }
    }

    all();
    postscribe(document.body, '<script src="remote/describe-write.js"></script>', {
      afterAsync: () => {
        all();
        done();
      }
    });
    all(v => expect(v).not.to.be.ok());
  });

});

