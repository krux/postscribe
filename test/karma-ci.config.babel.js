/* eslint-env node */
import path from 'path';
import isparta from 'isparta';
import pkg from '../package.json';
import baseConfig from './karma-base.config.babel.js';

module.exports = config => {
  baseConfig.webpack.module.preLoaders = [
    {
      test: /\.js$/,
      loader: 'isparta',
      include: path.resolve('src/')
    }
  ];

  baseConfig.coverageReporter = {
    // configure the reporter to use isparta for JavaScript coverage
    instrumenters: {
      isparta
    },

    instrumenter: {
      'src/**/*.js': 'isparta'
    },

    instrumenterOptions: {
      isparta: {
        babel: pkg.babel,
        noAutoWrap: true
      }
    },

    dir: '../build/test-reports/coverage/',

    reporters: [
      {type: 'text-summary'},
      {type: 'text'},
      {type: 'lcov', dir: '../build/test-reports/coverage/'}
    ]
  };

  baseConfig.reporters = ['mocha', 'coverage', 'coveralls'];

  config.set(baseConfig);
};
