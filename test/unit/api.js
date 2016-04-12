/* global $,postscribe,ok,start,asyncTest */
/* eslint-disable no-var */

import postscribe from '../../src/postscribe';

$(document).ready(() => {

  module('api');

  const testCalled = (method) => {
    asyncTest('it calls ' + method, () => {
      const options = {};
      options[method] = () => {
        ok(1);
        start();
      };

      postscribe(document.body, '<script type="text/javascript" src="remote/set-global1.js"></script>', options);
    });
  };

  testCalled('beforeEnqueue');
  testCalled('afterDequeue');
  testCalled('afterStreamStart');
});

