/* global $,testWrite */
/* eslint-disable no-var */
import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('multiple');

  testWrite('MULT1',
    ctx => {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-remote-and-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    },
    ctx => {
      ctx.writeRemote('remote/write-inline-script.js');
      ctx.write('<div id="local">Local</div>');
    }
  );

});

