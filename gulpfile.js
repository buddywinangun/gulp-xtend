/**
 * gulpfile.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const runSequence = require("gulp4-run-sequence");

// -- Config

const config = require('./config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

const requireDir = require('require-dir');
requireDir('./tasks');

// -- Compile task runner

gulp.task('gulp:compile', function (callback) {
  runSequence(
    'clear-cache',
    'compile-template',
    'compile-static',
    'compile-style',
    callback
  );
});

// -- watch task runner

gulp.task('watch', done => {
  const pathWatch = config.paths.watch(config.project);

  gulp.watch(pathWatch, callback => {
    runSequence(
      'gulp:compile',
      'reload',
      callback
    );
  });

  done();
});

// -- task serve

gulp.task('serve', (callback) => {
  runSequence(
    'gulp:compile',
    [
      'runServer', 'watch'
    ],
    callback
  );
});

// -- task default

gulp.task('default', gulp.series(
  'clean',
  'gulp:compile'
));