import postscribe from '../../src/postscribe';

describe('api', () => {
  function itCalls(name) {
    it(`calls ${name}`, done => {
      const options = {};
      options[name] = sinon.spy();
      options.done = () => {
        expect(options[name].callCount).to.be.equal(1);
        done();
      };

      postscribe(document.body, '<script type="text/javascript" src="remote/set-global1.js"></script>', options);
    });
  }

  itCalls('beforeEnqueue');
  itCalls('afterDequeue');
  itCalls('afterStreamStart');
});
