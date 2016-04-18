import * as wc from '../helpers/write-comparor';

describe('style', () => {
  it('simple style', done => {
    wc.compare('<style type="text/css">#test_style {' +
      'background:blue;' +
      'width:200px;' +
      'height:300px;' +
      'border: 2px solid red;' +
      '}</style>' +
      '<div id="test_style">' +
      '<img src="http://lorempixel.com/100/80/sports/"/>' +
      '</div>').then(r => expect(r).to.be.ok()).always(done);
  });
});

