import postscribe from '../../src/postscribe';

describe('bugs', () => {
  function itCallsEvent(name, src, callCount = 1) {
    it(callCount === 0 ? `does not call ${name} for ${src}` : `calls ${name} for ${src}`, done => {
      const handlerName = `postscribe_${name}_handler`;
      window[handlerName] = sinon.spy();

      const options = {};
      options.done = () => {
        expect(window[handlerName].callCount).to.be.equal(callCount);
        done();
      };
      options.error = err => {
        console.error(err);
      };

      postscribe(document.body, `<script ${name}="${handlerName}();" src="${src}"></script>`, options);
    });
  }

  describe('issue 262: onerror and onload on script tags not firing', () => {
    itCallsEvent('onload', 'remote/set-global1.js');
    itCallsEvent('onload', 'remote/does-not-exist.js', 0);
    itCallsEvent('onerror', 'remote/set-global1.js', 0);
    itCallsEvent('onerror', 'remote/does-not-exist.js');
  });
});
