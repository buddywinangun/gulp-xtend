/**
 * svgs.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const path = require('path');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.version(config.project, path);

const svgOpts = {
  compile: {
    src: path.join(opts.src, 'svg', '**/*.svg'),
    dest: path.join(opts.build, config.project.paths.assets, 'svg')
  }
};

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('svgs-compile', done => {

  // Make sure this feature is activated before running
  if (!config.settings.svgs) return done();

  // Optimize SVG files
  return gulp.src(svgOpts.compile.src)
    .pipe(svgmin())
    .pipe(gulp.dest(svgOpts.compile.dest, {
      overwrite: true
    }));
});

gulp.task('svgs-tasks', gulp.series(
  'svgs-compile'
));