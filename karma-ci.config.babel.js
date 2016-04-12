/* eslint-env node */
import baseConfig from './karma-base.config.babel.js';

module.exports = (config) => {
  baseConfig.reporters = ['coverage', 'coveralls'];

  config.set(baseConfig);
};
