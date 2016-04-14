/* eslint-env node */
import baseConfig from './karma-base.config.babel.js';
import customLaunchers from './saucelabs.config.babel.js';

module.exports = (config) => {
  baseConfig.reporters = [
    'dots',
    'saucelabs'
  ];

  baseConfig.sauceLabs = {
    testName: 'PostScribe Tests'
  };

  baseConfig.customLaunchers = customLaunchers;

  baseConfig.browsers = Object.keys(customLaunchers);

  config.set(baseConfig);
};
