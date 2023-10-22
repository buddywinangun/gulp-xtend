/**
 * sass.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const header = require("gulp-header");
const sourcemaps = require("gulp-sourcemaps");
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");

// -- Config

const config = require('../config');

// -- Styles

const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("cssnano");
const cleanCss = require("gulp-clean-css");

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('compile-style', done => {

	// Make sure this feature is activated before running
  if (!config.settings.style) return done();

	// Run tasks on all Sass files
  return gulp.src(config.paths.style.input(config.project))
    .pipe(plumber(config.utils.errorHandler))
    .pipe(config.utils.isProd ? noop() : sourcemaps.init())
    .pipe(
      sass.sync({
        outputStyle: config.utils.isProd ? 'compressed' : 'expanded',
        includePaths: [config.paths.node.dir(config.project)],
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer({
      cascade: true,
      remove: true
    }))
    .pipe(header(config.project.header.main, {
      package: config.project.data
    }))
    .pipe(!config.utils.isProd ? noop() :
      postcss([
        cssnano({
          discardComments: {
            removeAll: true
          }
        })
      ])
    )
    .pipe(!config.utils.isProd ? noop() :
      cleanCss({
        compatibility: 'ie11',
        level: {
          1: {
            specialComments: 0
          }
        }
      })
    )
    .pipe(config.utils.isProd ? noop() : sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.paths.style.output(config.project)));
});