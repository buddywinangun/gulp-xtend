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

gulp.task('clean', done => {
  if (!config.settings.clean) return done();

  del.sync([config.paths.build(config.project)], {
    force: true
  })
  done();
});

gulp.task('clear-cache', done => {
  cache.caches = {};
  done();
});