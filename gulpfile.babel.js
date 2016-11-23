/* eslint-env node */
import gulp from 'gulp';
import path from 'path';
import del from 'del';
import pkg from './package.json';
import webpackConfig from './webpack.config.babel.js';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import {Server as Karma} from 'karma';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import filter from 'gulp-filter';
import stripDebug from 'gulp-strip-debug';
import eslint from 'gulp-eslint';
import jscs from 'gulp-jscs';
import header from 'gulp-header';
import esdoc from 'gulp-esdoc';

const DIST = 'dist';
const BUILD = 'build';

const BANNER = [
  '/**',
  ` * @file ${pkg.name}`,
  ` * @description ${pkg.description}`,
  ` * @version v${pkg.version}`,
  ` * @see {@link ${pkg.homepage}}`,
  ` * @license ${pkg.license}`,
  ` * @author ${pkg.author.name}`,
  ` * @copyright ${new Date().getFullYear()} Krux Digital, Inc`,
  ' */',
  ''
].join('\n');

const LINTABLE_PATTERN = [
  '*.js',
  'src/**/*.js',
  'test/random.js',
  'test/helpers.js',
  'test/generate_expected.phantom.js',
  'test/unit/**.js'
];

function build(config) {
  const basename = path.basename(config.output.filename, path.extname(config.output.filename));
  const jsOnly = filter(['**/*.js'], {restore: true});
  const mapOnly = filter(['**/*.map']);

  return () => webpackStream(config)
    .pipe(jsOnly)
    .pipe(header(BANNER))
    .pipe(rename({basename: basename, extname: '.max.js'}))
    .pipe(gulp.dest(DIST))
    .pipe(stripDebug())
    .pipe(rename({basename: basename, extname: '.js'}))
    .pipe(gulp.dest(DIST))
    .pipe(uglify({compress: {properties: false}, output: {'quote_keys': true}}))
    .pipe(header(BANNER))
    .pipe(rename({basename: basename, extname: '.min.js'}))
    .pipe(gulp.dest(DIST))
    .pipe(jsOnly.restore)
    .pipe(mapOnly)
    .pipe(gulp.dest(DIST));
}

function test(configName, failOnError = true, karmaOptions = {}) {
  return done => new Karma(Object.assign({
    configFile: path.resolve(`test/karma-${configName}.config.babel.js`)
  }, karmaOptions), err => {
    if (err) {
      gutil.log('[test]', 'Tests failed');
      if (failOnError) {
        done(new gutil.PluginError('karma', 'Tests failed'));
      } else {
        done();
      }
    } else {
      done();
    }
  }).start();
}

gulp.task('default', ['lint', 'build', 'doc', 'test']);

gulp.task('clean', () => {
  return del.sync([`${DIST}/**`, `${BUILD}/**`]);
});

gulp.task('build', build(webpackConfig));

gulp.task('doc', () => {
  return gulp.src('./src')
    .pipe(esdoc({
      destination: './doc'
    }));
});

gulp.task('lint', ['lint:eslint', 'lint:jscs']);

gulp.task('lint:eslint', () => {
  return gulp.src(LINTABLE_PATTERN)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:jscs', () => {
  return gulp.src(LINTABLE_PATTERN)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('serve', ['build'], done => {
  const devConfig = Object.create(webpackConfig);
  devConfig.devtool = 'eval';
  devConfig.debug = true;

  gutil.log('[serve]', `http://localhost:${pkg.config.ports.cdn}/`);

  new WebpackDevServer(webpack(devConfig), {
    contentBase: DIST,
    hot: true,
    quiet: false,
    stats: {
      colors: true
    }
  }).listen(pkg.config.ports.cdn, 'localhost', (err, stats) => {
    if (err) {
      done(new gutil.PluginError('webpack', err));
    } else {
      if (stats) {
        gutil.log('[serve]', stats.toString({
          colors: true
        }));
      }

      done();
    }
  });
});

gulp.task('test', test('coverage'));
gulp.task('test:ci', test('ci'));
gulp.task('test:coverage', test('coverage', false));
gulp.task('test:cross-browser', test('sauce'));
gulp.task('test:debug', test('nocoverage', true, {singleRun: false}));
gulp.task('test:nocoverage', test('nocoverage', false));

gulp.task('tdd', ['test:nocoverage'], () => {
  gulp.watch(['src/**', 'test/**'], ['test:nocoverage']);
});

gulp.task('tdd:coverage', ['test:coverage'], () => {
  gulp.watch(['src/**', 'test/**'], ['test:coverage']);
});

