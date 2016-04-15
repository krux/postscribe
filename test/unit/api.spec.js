import postscribe from '../../dist/postscribe';

describe('api', function() {
  const itCalls = name => {
    it(`calls ${name}`, function(done) {
      this.timeout(1000);
      $(document).ready(() => {
        const options = {done};
        options[name] = () => {
          expect(1).to.be.ok();
        };
        postscribe(document.body, '<script type="text/javascript" src="remote/set-global1.js"></script>', options);
      });
    });
  };

  itCalls('beforeEnqueue');
  itCalls('afterDequeue');
  itCalls('afterStreamStart');
});
