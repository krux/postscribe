require('babel-register');
require('process');
process.chdir('..');
module.exports = require('./karma-nocoverage.config.babel');
