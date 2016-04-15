/* global $,it,setOptions */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';
import WriteComparor from './write-comparor';


describe('Simple writes', function() {
  const wc = new WriteComparor();
  const ok = r => expect(r).to.be.ok();
  const nok = e => expect().fail(e);

  it('empty tag', done => {
    wc.compare('<span>A<input name="B">C</span>D').then(ok, nok).finally(done);
  });

  it('SW1', done => {
    wc.compare('<div>', '<i>foo').then(ok, nok).finally(done);
  });

  it('SW2', done => {
    wc.compare('<div><i', '>foo').then(ok, nok).finally(done);
  });

  it('SW2-b', done => {
    wc.compare('<div>foo', '<div>bar').then(ok, nok).finally(done);
  });

  it('SW3', done => {
    wc.compare('<div><i>foo', '</i><div>bar').then(ok, nok).finally(done);
  });

  it('SW4', done => {
    wc.compare('<div><i></i></div>', '<div>foo').then(ok, nok).finally(done);
  });

  it('SW5', done => {
    wc.compare('<div><i></i></div>foo').then(ok, nok).finally(done);
  });

  it('SW6', done => {
    wc.compare('<div><i></i></div>', '<div>foo<i', '></i></div>bar').then(ok, nok).finally(done);
  });

  it('SW7', done => {
    wc.compare('<div><div><i></i></div>', 'foo', '<div>bar</div>').then(ok, nok).finally(done);
  });

  it('SW8', done => {
    wc.compare('<div><i></i></div>', 'foo', '<div>', '<i></i>').then(ok, nok).finally(done);
  });

  it('SW9', done => {
    wc.compare('<div><i></i></div>', 'foo', '<div>bar', '<i></i>').then(ok, nok).finally(done);
  });

  it('SW10', done => {
    wc.compare('<div><b><i></i></b></div>', 'foo', '<div>bar<i>', '</i>bla').then(ok, nok).finally(done);
  });

});

