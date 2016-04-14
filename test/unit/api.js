/* global describe,it */
import postscribe from '../../src/postscribe';

describe('api', () => {
  const itCalls = name => {
    it(`calls ${name}`, function(done) {
      this.timeout(1000);
      $(document).ready(() => {
        const options = {};
        options[name] = () => {
          expect(1);
          done();
        };
        postscribe(document.body, '<script type="text/javascript" src="remote/set-global1.js"></script>', options);
      });
    });
  };

  itCalls('beforeEnqueue');
  itCalls('afterDequeue');
  itCalls('afterStreamStart');
});
