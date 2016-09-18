/* eslint-env node */
import pkg from '../package.json';
import webpackConfig from '../webpack.config.babel.js';
import webpack from 'webpack';

export default {
  basePath: '',

  browserDisconnectTimeout: 20000, // ms

  browserDisconnectTolerance: 2, // times

  browserNoActivityTimeout: 60000, // ms

  frameworks: [
    'expect',
    'mocha',
    'sinon'
  ],

  files: [
    '../node_modules/jquery/dist/jquery.js',
    '**/*.spec.js',
    {pattern: 'remote/*.js', watched: true, included: false, served: true}
  ],

  exclude: [],

  preprocessors: {
    '*.js': ['webpack', 'sourcemap'],
    'unit/**/*.js': ['webpack', 'sourcemap'],
    'bugs/**/*.js': ['webpack', 'sourcemap']
  },

  // generate_expected breaks the path a bit b/c it's writing relative to itself.
  // remap it here to avoid 404s
  proxies: {
    '/remote/': '/base/remote/'
  },

  babelPreprocessor: {
    options: pkg.babel
  },

  reporters: [
    'mocha'
  ],

  port: 9876,

  colors: true,

  logLevel: 'info',

  autoWatch: false,

  browsers: [
    'PhantomJS'
  ],

  singleRun: true,

  webpack: Object.assign(webpackConfig, {
    devtool: 'inline-source-map'
  }),

  webpackMiddleware: {
    noInfo: true
  },

  concurrency: Infinity
};
