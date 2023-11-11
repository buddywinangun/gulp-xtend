/**
 * clean.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const path = require('path');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.version(config.project, path);

const staticOpts = {
  compile: {
    src: path.join(opts.src, 'static/**/*'),
    dest: path.join(opts.build, config.project.paths.assets)
  }
};

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('static-compile', done => {

  // Make sure this feature is activated before running
  if (!config.settings.static) return done();

  // Copy static files
  gulp.src(staticOpts.compile.src)
    .pipe(gulp.dest(staticOpts.compile.dest, {
      overwrite: true
    }));

  // Signal completion
  done();
});

gulp.task('static-tasks', gulp.series(
  'static-compile'
));