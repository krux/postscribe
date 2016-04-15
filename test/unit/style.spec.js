/* global $,testWrite,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';
import WriteComparor from './write-comparor';


describe('style', function() {
  const wc = new WriteComparor();

  it('simple style', done => {
    wc.compare('<style type="text/css">#test_style {' +
      'background:blue;' +
      'width:200px;' +
      'height:300px;' +
      'border: 2px solid red;' +
      '}</style>' +
      '<div id="test_style">' +
      '<img src="http://lorempixel.com/100/80/sports/"/>' +
      '</div>').then(r => expect(e).to.be.ok()).finally(done);
  });

});

