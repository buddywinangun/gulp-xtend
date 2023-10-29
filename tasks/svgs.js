/**
 * svgs.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');

// -- Config

const config = require('../config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('compile-svgs', done => {

	// Make sure this feature is activated before running
  if (!config.settings.svgs) return done();

	// Optimize SVG files
  return gulp.src(config.paths.svgs.input(config.project))
		.pipe(svgmin())
    .pipe(gulp.dest(config.paths.svgs.output(config.project)));
});