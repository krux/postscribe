import postscribe from '../../src/postscribe';
import WriteComparor from './write-comparor';
import {Html} from './write-thunks';


describe('Self Closing', function() {
  const wc = new WriteComparor();

  xit('Handles closed self-closing tags that\'re closed.', done => {
    wc.compare(
      new Html(`
        <div id="first" style="background: red; padding: 5px">
          <embed></embed>
          <div id="second" style="background: yellow">Should be yellow in red box, right?</div>
        </div>
      `)
    ).then(r => expect(r).to.be.ok()).finally(done);
  });

  it('Handles closed self-closing tags that\'re closed w/ a slash.', done => {
    wc.compare(
      '<div><object><param name="allowFullScreen" value="true" /><param></param></object></div>'
    ).then(r => expect(r).to.be.ok()).finally(done);
  });

});

