/**
 * sync.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const path = require('path');
const browserSync = require("browser-sync").create();
const runSequence = require("gulp4-run-sequence");
const cli = require('../lib/cli');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('browser', (done) => {

	// Make sure this feature is activated before running
	if (!config.settings.reload) return done();

	// Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: [config.paths.version(config.project, path).build]
    },
    port: cli.port ? Number(cli.port) : 9000,
    open: true
  });

	// Signal completion
	done();
});

gulp.task('reload', (done) => {

	// Make sure this feature is activated before running
	if (!config.settings.reload) return done();

  // Reload the browser when files change
  browserSync.reload();

	// Signal completion
  done();
});

gulp.task('compile', (callback) => {
  runSequence(
    'sass-tasks',
    'svgs-tasks',
    'script-tasks',
    'static-tasks',
    'template-tasks',
    callback
  );
});

gulp.task('watch', done => {
  gulp.watch([
    config.paths.version(config.project, path).src,
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
    ['browser', 'watch'],
    callback
  );
});