/* eslint-env node */
import baseConfig from './karma-base.config.babel.js';
import customLaunchers from './saucelabs.config.babel.js';

module.exports = (config) => {
  baseConfig.reporters = [
    'dots',
    'saucelabs'
  ];

  baseConfig.sauceLabs = {
    testName: 'Postscribe Tests'
  };

  baseConfig.customLaunchers = customLaunchers;

  baseConfig.browsers = Object.keys(customLaunchers);

  config.set(baseConfig);
};
