import postscribe from '../../src/postscribe';

describe('vbscript', () => {
  if (window.supportsVbscript) {
    it('vbscript', done => {
      const div = document.createElement('div');
      div.id = 'vbscript-test';
      document.body.appendChild(div);
      postscribe('#vbscript-test', '<script type="text/vbscript">canWriteVbscriptTags = true</script>');
      expect(window.canWriteVbscriptTags).to.be.ok();

      postscribe('#vbscript-test', '<script type="text/vbscript" src="remote/set-global.vb"></script>', {
        done: () => {
          expect(window.remoteVbscriptGlobal, 'wrote remote vbscript tag').to.be.ok();
          done();
        }
      });
    });
  } else {
    it('does not have vbscript', () => expect(1));
  }
});

