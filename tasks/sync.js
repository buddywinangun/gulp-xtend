/**
 * sync.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const browserSync = require("browser-sync");

// -- Config

const config = require('../config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('runServer', () => {
  return browserSync.init({
    server: {
      baseDir: [config.paths.build(config.project)]
    },
    port: 8080,
    open: true
  });
});

gulp.task('reload', done => {
  browserSync.reload();
  done();
});