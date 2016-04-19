/* eslint-env node */
import baseConfig from './karma-base.config.babel.js';
import customLaunchers from './saucelabs.config.babel.js';

module.exports = config => {
  Object.assign(baseConfig, {
    client: {
      mocha: {
        timeout: 5000  // Wait around a long time to avoid slow hardware from failing tests.
      }
    },

    customLaunchers,

    browsers: Object.keys(customLaunchers),

    browserDisconnectTimeout: 60000, // ms

    browserDisconnectTolerance: 3, // times

    browserNoActivityTimeout: 300000, // ms

    reporters: [
      'dots',
      'saucelabs'
    ],

    sauceLabs: {
      testName: 'PostScribe Tests'
    }
  });

  config.set(baseConfig);
};
