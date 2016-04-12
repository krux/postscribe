/* eslint-env node */
import pkg from './package.json';
import webpackConfig from './webpack.config.babel.js';
import webpack from 'webpack';

webpackConfig.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false
    }
  })
];

export default {
  autoWatch: false,

  babelPreprocessor: {
    options: pkg.babel
  },

  basePath: '',

  browserDisconnectTimeout: 20000, // ms

  browserDisconnectTolerance: 2, // times

  browsers: [
    'PhantomJS'
  ],

  browserNoActivityTimeout: 60000, // ms

  colors: true,

  concurrency: Infinity,

  exclude: [],

  files: [
    'node_modules/jquery/dist/jquery.js',
    {pattern: 'src/**/*.js', watched: true, included: false, served: true},
    'test/random.js',
    'test/expected.js',
    'test/helpers.js',
    {pattern: 'test/unit/*.js', watched: true, included: true},
    {pattern: 'test/remote/*.js', watched: true, included: false, served: true}
  ],

  frameworks: [
    'qunit'
  ],

  logLevel: 'debug',

  port: 9876,

  preprocessors: {
    'test/**/*.js': ['webpack']
  },

  // generate_expected breaks the path a bit b/c it's writing relative to itself.
  // remap it here to avoid 404s
  proxies: {
    '/remote/': '/base/test/remote/'
  },

  reporters: [
    'progress'
  ],

  singleRun: true,

  webpack: webpackConfig,

  webpackMiddleware: {
    noInfo: true
  }
};
