/**
 * sync.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const cli = require('../helpers/cli');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('runServer', (done) => {

	// Make sure this feature is activated before running
	if (!config.settings.reload) return done();

	// Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: [config.paths.build(config.project)]
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