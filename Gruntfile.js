/*jshint node:true*/
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
      banner: '/* <%= pkg.description %>, v<%= pkg.version %> <%= pkg.homepage %>\n' +
        'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, MIT license ' +
        '<%= pkg.licenses[0].url %> */'
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
        src: ['postscribe.js', 'htmlParser/htmlParser.js', 'test/test.js']
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= meta.banner %>', 'htmlParser/htmlParser.js', 'postscribe.js'],
        dest: 'dist/postscribe.js'
      }
    },
    // Minify postscribe src to postscribe.min.js, prepending a banner
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'dist/postscribe.min.js': ['dist/postscribe.js']
        }
      }
    },

    qunit: {
      files: ['test/test.html']
    },

    watch: {
      files: ['postscribe.js', 'test/*'],
      tasks: 'jshint qunit'
    },

    generate_expected: {
      dest: 'test/expected.js',
      index: '<%= qunit.files %>',
      phantom: 'test/generate_expected.phantom.js'
    }

  });

  grunt.registerTask('generate_expected', 'Generate Files', function() {
    var done = this.async();

    var data = grunt.config('generate_expected');
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

  // Alias test
  grunt.registerTask('test', ['generate_expected', 'qunit']);
  grunt.registerTask('min', ['concat', 'uglify']);
  // This is what gets run when you don't specify an argument for grunt.
  grunt.registerTask('default', ['jshint', 'test']);

};
