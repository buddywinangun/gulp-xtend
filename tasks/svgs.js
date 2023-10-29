/**
 * svgs.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.svgs(config.project);

const svgOpts = {
  compile: {
    src: path.join(process.cwd(), opts.src),
    dest: path.join(process.cwd(), opts.build)
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