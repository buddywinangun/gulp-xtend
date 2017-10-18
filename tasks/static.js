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

  if (!config.settings.static) return done();

  return gulp.src(config.paths.static.input(config.project))
    .pipe(gulp.dest(config.paths.static.output(config.project)));
});