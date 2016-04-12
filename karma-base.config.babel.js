/* eslint-env node */
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

  reporters: [
    'progress'
  ],

  // generate_expected breaks the path a bit b/c it's writing relative to itself.
  // remap it here to avoid 404s
  proxies: {
    '/remote/': '/base/test/remote/'
  },

  port: 9876,

  colors: true,

  logLevel: 'debug',

  autoWatch: false,

  browsers: [
    'PhantomJS'
  ],

  singleRun: true,
  concurrency: Infinity
};
