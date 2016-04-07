/* eslint-env node */
import pkg from './package.json';
import webpackConfig from './webpack.config.babel.js';

export default {
  basePath: '',

  browserDisconnectTimeout: 20000, // ms

  browserDisconnectTolerance: 2, // times

  browserNoActivityTimeout: 60000, // ms

  frameworks: [
    'qunit'
  ],

  files: [
    'node_modules/jquery/dist/jquery.js',
    'dist/postscribe.js',
    'test/random.js',
    'test/expected.js',
    'test/helpers.js',
    {pattern: 'test/unit/*.js', watched: true, included: true},
    {pattern: 'test/remote/*.js', watched: true, included: false, served: true}
  ],

  exclude: [],

  preprocessors: {
    // 'test/**/*.js': ['webpack']
  },

  babelPreprocessor: {
    options: pkg.babel
  },

  reporters: [
    'progress'
  ],

  port: 9876,

  colors: true,

  logLevel: 'info',

  autoWatch: false,

  browsers: [
    'PhantomJS'
  ],

  singleRun: true,

  webpack: webpackConfig,

  webpackMiddleware: {
    noInfo: true
  },

  concurrency: Infinity
};
