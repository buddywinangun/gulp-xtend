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

// ---------------------------------------------------
// -- Task Definitions
// ---------------------------------------------------

gulp.task('compile', (callback) => {
  runSequence(
    'sass-tasks',
    'svgs-tasks',
    'script-tasks',
    'template-tasks',
    callback
  );
});

gulp.task('watch', done => {
  gulp.watch([
    config.paths.watch(config.project),
  ], callback => {
    runSequence(
      'compile',
      'reload',
      callback
    );
  });

  done();
});

gulp.task('serve', (callback) => {
  runSequence(
    'compile',
    ['runServer', 'watch'],
    callback
  );
});

gulp.task('default', gulp.series('clean', 'compile'));