import postscribe from '../../src/postscribe';

describe('errors', () => {
  function handlesError(html) {
    return done => {
      let oldOnError = window.onerror;
      window.onerror = null;

      const div = document.createElement('div');
      document.body.appendChild(div);

      let error = null;

      postscribe(div, html, {
        error(e) {
          error = e;
          window.onerror = oldOnError;
          expect(error).to.be.ok();
          done();
        },
        done() {
          window.onerror = oldOnError;
          expect(error).to.not.be.ok();
          done();
        }
      });
    };
  }

  it('syntax error', handlesError('<script>va x</script>'));

  it('js exception', handlesError('<script>throw 1;</script>'));

  // IE cannot report remote script errors
  it('remote script malformed url', handlesError('<script src="404"></script>'));

  it('remote script 404', handlesError('<script src="http://cdn.krxd.net/not_found"></script>'));

});
