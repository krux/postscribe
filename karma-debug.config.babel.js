/* eslint-env node */
import pkg from './package.json';
import webpackConfig from './webpack.config.babel.js';
import webpack from 'webpack';

export default {
  basePath: '',

  browserDisconnectTimeout: 20000, // ms

  browserDisconnectTolerance: 2, // times

  browserNoActivityTimeout: 60000, // ms

  client: {
    mocha: {
      timeout: 6000
    }
  },

  frameworks: [
    'mocha',
    'sinon',
    'expect'
  ],

  files: [
    'node_modules/jquery/dist/jquery.js',
    'test/**/*.spec.js',
    {pattern: 'test/remote/*.js', watched: true, included: false, served: true}
  ],

  exclude: [],

  preprocessors: {
    'test/*.js': ['webpack', 'sourcemap'],
    'test/unit/**/*.js': ['webpack', 'sourcemap']
  },

  babelPreprocessor: {
    options: pkg.babel
  },

  proxies: {
    '/remote/': '/base/test/remote/'
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

  singleRun: false,

  webpack: Object.assign(webpackConfig, {
    devtool: 'inline-source-map'
  }),

  webpackMiddleware: {
    noInfo: true
  },

  concurrency: Infinity
};
