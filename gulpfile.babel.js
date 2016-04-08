/* eslint-env node */
import process from 'process';
import gulp from 'gulp';
import pkg from './package.json';
import {Server as Karma} from 'karma';
import git from 'gulp-git';
import del from 'del';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';
import stripDebug from 'gulp-strip-debug';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.babel.js';
import WebpackDevServer from 'webpack-dev-server';
import eslint from 'gulp-eslint';
import jscs from 'gulp-jscs';
import header from 'gulp-header';
import esdoc from 'gulp-esdoc';
import path from 'path';

const DEST = 'dist';
const banner = [
  '/**',
  ` * @file ${pkg.name}`,
  ` * @description ${pkg.description}`,
  ` * @version v${pkg.version}`,
  ` * @see {@link ${pkg.homepage}}`,
  ' * @license MIT',
  ` * @author ${pkg.author.name}`,
  ` * @copyright ${new Date().getFullYear()} Krux Digital, Inc`,
  ' */',
  ''
].join('\n');

gulp.task('clean', () => {
  return del.sync([`${DEST}/**`]);
});

gulp.task('eslint', () => {
  return gulp.src(['*.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jscs', () => {
  return gulp.src(['*.js', 'src/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', ['eslint', 'jscs']);

function build(config) {
  return () => webpackStream(config)
    .pipe(replace('Object.defineProperty', '(function(t, k, d) {return t[k] = d.value;})'))
    .pipe(gulp.dest(DEST))
    .pipe(rename({extname: '.min.js'}))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(gulp.dest(DEST));
}

gulp.task('build', build(webpackConfig));

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('serve', ['clean', 'build'], done => {
  const devConfig = Object.create(webpackConfig);
  devConfig.devtool = 'eval';
  devConfig.debug = true;

  gutil.log('[serve]', `http://localhost:${pkg.config.ports.cdn}/`);
  new WebpackDevServer(webpack(devConfig), {
    contentBase: DEST,
    hot: true,
    quiet: false,
    stats: {
      colors: true
    }
  }).listen(pkg.config.ports.cdn, 'localhost', (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    if (stats) {
      gutil.log('[serve]', stats.toString({
        colors: true
      }));
    }

    done();
  });
});

function karma(configName, failOnError = true) {
  return done => new Karma({
    configFile: path.resolve(`./${configName}.config.babel.js`)
  }, err => {
    if (err) {
      gutil.log('[test]', 'Tests failed');
      if (failOnError) {
        process.exit(err);
      }
    }
    done();
  }).start();
}

gulp.task('test', karma('karma'));

gulp.task('test:pre-release', karma('karma-sauce'));

gulp.task('test:tdd', karma('karma', false));

gulp.task('tdd', ['test:tdd'], () => {
  gulp.watch(['*.js', 'src/**', 'test/**'], ['test:tdd']);
});

gulp.task('release', ['default'], done => {
  git.exec({args: `tag ${pkg.version}`}, err => {
    if (err) {
      throw err;
    }
    git.exec({args: 'push origin master --tags'}, err => {
      if (err) {
        throw err;
      }
      done();
    });
  });
});

gulp.task('doc', () => {
  return gulp.src('./src')
    .pipe(esdoc({
      destination: './doc'
    }));
});

gulp.task('default', ['clean', 'lint', 'build', 'test']);

