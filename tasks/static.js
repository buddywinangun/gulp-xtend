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

gulp.task('static-dependencies', (done) => {

  for (var k in config.project.copyDependencies) {
    getpath = path.join(config.project.dir, k);

    if (k.search('node_modules') !== 0) {
      getpath = path.join(config.project.dir, config.project.version.input, k);
    }

    gulp.src(getpath)
      .pipe(gulp.dest(path.join(staticOpts.compile.dest, config.project.copyDependencies[k])))
  }

  // Signal completion
  done();
});

gulp.task('static-tasks', gulp.series(
  'static-compile',
  'static-dependencies'
));