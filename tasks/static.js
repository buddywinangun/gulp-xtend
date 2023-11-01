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
    dest: path.join(opts.build, 'assets')
  }
};

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('static-compile', done => {

  // Make sure this feature is activated before running
  if (!config.settings.static) return done();

  // Copy static files
  return gulp.src(staticOpts.compile.src)
    .pipe(gulp.dest(staticOpts.compile.dest, {
      overwrite: true
    }));
});

gulp.task('static-tasks', gulp.series(
  'static-compile'
));