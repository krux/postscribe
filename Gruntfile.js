var path = require('path');
var webpack = require('webpack');

module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  // Autoload grunt plugins.
  var _ = require('lodash');
  _.filter(_.keys(pkg.devDependencies), function (key) {
    return (/^grunt-/).test(key) && key !== 'grunt-cli';
  }).forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    meta: {
      banner: '<%= pkg.description %>, v<%= pkg.version %> <%= pkg.homepage %>\n' +
        'Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>, MIT license ' +
        '<%= pkg.licenses[0].url %>'
    },
    clean: {
      build: ['dist']
    },
    eslint: {
      options: {
        configFile: './.eslintrc'
      },
      node: ['Gruntfile.js', 'test/generate_expected.phantom.js'],
      browser: ['src']
    },
    jshint: {
      // Grr, plugin keeps trying to iterate this...
      jshintrc: './.jshintrc',
      // Just for the 'node' src files
      node: {
        src: ['Gruntfile.js', 'test/generate_expected.phantom.js']
      },
      // Just for the 'browser' src files
      browser: {
        src: ['src/**/*.js']
      }
    },
    webpack: {
      build: {
        entry: {
          postscribe: './src/postscribe.js'
        },
        output: {
          path: path.join(__dirname, 'dist'),
          filename: 'postscribe.js',
          library: ['postscribe'],
          libraryTarget: 'umd'
        },
        plugins: [
          new webpack.BannerPlugin('<%= meta.banner %>')
        ]
      },
      buildmin: {
        entry: {
          postscribe: './src/postscribe.js'
        },
        output: {
          path: path.join(__dirname, 'dist'),
          filename: 'postscribe.min.js',
          library: ['postscribe'],
          libraryTarget: 'umd'
        },
        plugins: [
          new webpack.BannerPlugin('<%= meta.banner %>'),
          new webpack.optimize.UglifyJsPlugin()
        ]
      }
    },

    qunit: {
      files: ['test/test.html']
    },

    watch: {
      files: ['src/**/*', 'test/*'],
      tasks: ['webpack:build', 'eslint', 'qunit']
    },

    generateExpected: {
      dest: 'test/expected.js',
      index: '<%= qunit.files %>',
      phantom: 'test/generate_expected.phantom.js'
    }

  });

  grunt.registerTask('generateExpected', 'Generate Files', function() {
    var done = this.async();

    var data = grunt.config('generateExpected');
    var args = [data.phantom, _.first(data.index), data.dest];
    console.info(args);
    grunt.util.spawn({cmd: './node_modules/.bin/phantomjs', args: args}, function(error, result) {
      console.info('Done.');
      if(error) {
        console.error(result.stderr);
      }
      done(!error);
    });
  });

  grunt.registerTask('test', ['build', 'generateExpected', 'qunit']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['clean', 'webpack:build', 'webpack:buildmin']);
  // This is what gets run when you don't specify an argument for grunt.
  grunt.registerTask('default', ['lint', 'test']);

};
