import postscribe from '../../src/postscribe';
const $ = require('jquery');

describe('bugs', () => {
  it('issue 463: dynamically created iframe with a text', done => {
    let text = 'body text';
    let script = `<script>
      var iframe = document.createElement('iframe');
    iframe['id'] = 'iframeid';
    iframe['frameBorder'] = 0;
    document.getElementsByTagName('body')[0].appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write('<!DOCTYPE html><head></head><body>${text}</body></html>');
    iframe.contentWindow.document.close();
    <\/script>`;

    const options = {};
    options.done = () => {
      setTimeout( function() {
        let iframe_text = $('#iframeid').contents().find('body').html();
        expect(iframe_text).to.be.equal(text);
        done();
      }, 4);
    };

    jQuery( document ).ready( function() {
      postscribe( document.body, script, options);
    });

  });
});
