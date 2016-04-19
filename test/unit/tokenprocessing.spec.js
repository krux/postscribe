import postscribe from '../../src/postscribe';

describe('tokenprocessing', () => {
  function testBeforeWriteTokenCalled(name, html, type, expectedAmount) {
    it(name, done => {
      let amount = 0;
      const div = document.createElement('div');
      div.id = name.replace(/\s/g, '-');
      document.body.appendChild(div);
      postscribe(div, html, {
        beforeWriteToken: tok => {
          if (tok.tagName === type && tok.type !== 'endTag') {
            amount++;
          }
          return tok;
        },
        done: () => {
          expect(amount === expectedAmount).to.be.ok();
          done();
        }
      });
    });
  }

  testBeforeWriteTokenCalled('beforeWriteToken is called for div', '<div>Test</div>', 'div', 1);
  testBeforeWriteTokenCalled('beforeWriteToken is called for script', '<script>document.write("A");</script>', 'script', 1);
  testBeforeWriteTokenCalled('beforeWriteToken is called for style', '<style>#test { }</style>', 'style', 1);
  testBeforeWriteTokenCalled('beforeWriteToken is called for nested scripts', '<script src="remote/write-inline-script.js"></script>', 'script', 2);

  it('alters script src', done => {
    const div = document.createElement('div');
    div.id = 'alter-script-src';
    document.body.appendChild(div);
    postscribe(div, '<script src="remote/write-inline-script.js"></script>', {
      beforeWriteToken: tok => {
        if (tok.tagName && tok.tagName === 'script') {
          tok.src = tok.src.replace('write-inline-script.js', 'write-div.js');
        }
        return tok;
      },
      done: () => {
        expect(div.firstChild.src.indexOf('write-div.js') > -1).to.be.ok();
        done();
      }
    });
  });

  it('alter img src', done => {
    const div = document.createElement('div');
    div.id = 'alter-img-src';
    document.body.appendChild(div);
    postscribe(div, '<img src="https://lorempixel.com/100/80/sports/" alt="">', {
      beforeWriteToken: tok => {
        if (tok.tagName && tok.tagName === 'img' && tok.attrs && tok.attrs.src) {
          tok.attrs.src = tok.attrs.src.replace('https://', 'http://');
        }
        return tok;
      },
      done: () => {
        expect(div.firstChild.src.indexOf('http://') === 0).to.be.ok();
        done();
      }
    });
  });

  it('skip scripts from http sources', done => {
    let amount = 0;
    const div = document.createElement('div');
    div.id = 'skip-scripts-from-http-sources';
    document.body.appendChild(div);
    postscribe(div, `
      <script src="http://domain.com/example.js"></script>
      <script src="remote/write-remote-and-inline-script.js"></script>
      <script src="http://domain2.com/example2.js"></script>`,
      {
        beforeWriteToken: tok => {
          if (tok.tagName && tok.tagName === 'script') {
            if (tok.src && tok.src.indexOf('http:') === 0) {
              return null;
            } else {
              amount++;
            }
          }
          return tok;
        },
        done: () => {
          expect(amount === 10 && div.innerHTML.indexOf('<script src="http://') === -1).to.be.ok();
          done();
        }
      }
    );
  });

  it('skip all style declarations', done => {
    const div = document.createElement('div');
    div.id = 'skip-all-style-declarations';
    document.body.appendChild(div);
    postscribe(div,
      '<style type="text/css">body { background-color: green; }</style>' +
      '<STYLE type="text/css">img { border: 1px solid red; }</STYLE>',
      {
        beforeWriteToken: tok => {
          if (tok.tagName && tok.tagName.toLowerCase() === 'style') {
            return null;
          }
          return tok;
        },
        done: () => {
          expect(div.innerHTML.indexOf('<style') === -1).to.be.ok();
          done();
        }
      }
    );
  });

});

