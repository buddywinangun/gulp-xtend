/**
 * clean.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');

// -- Config

const config = require('../config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('compile-static', done => {

	// Make sure this feature is activated before running
  if (!config.settings.static) return done();

	// Copy static files
  return gulp.src(config.paths.static.input(config.project))
    .pipe(gulp.dest(config.paths.static.output(config.project)));
});