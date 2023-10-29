/**
 * clean.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const del = require("del");
const cache = require("gulp-cached");

// -- Config

const config = require('../config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

// Remove pre-existing content from output folders
gulp.task('clean', done => {

	// Make sure this feature is activated before running
  if (!config.settings.clean) return done();

	// Clean the dist folder
  del.sync([config.paths.build(config.project)], {
    force: true
  });

	// Signal completion
  done();
});

gulp.task('clear-cache', done => {
  cache.caches = {};
  done();
});