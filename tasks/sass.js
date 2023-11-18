/**
 * sass.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const sourcemaps = require("gulp-sourcemaps");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");
const path = require('path');

// -- SASS

const header = require("gulp-header");
const sass = require("gulp-sass")(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const cleancss = require("gulp-clean-css");
const trim = require('../lib/trim');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.version(config.project, path);

const sassOpts = {
  compile: {
    src: path.join(opts.src, 'sass', '*.scss'),
    dest: path.join(opts.build, config.project.paths.assets, 'css'),
    banner: {
      text: config.project.banner,
      data: config.project
    }
  }
};

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('sass-compile', (done) => {

  // Make sure this feature is activated before running
  if (!config.settings.sass) return done();

  const banner = {
    text: sassOpts.compile.banner.text,
    data: sassOpts.compile.banner.data
  };

  // Run tasks on all Sass files
  gulp.src(sassOpts.compile.src)
    .pipe(plumber(config.utils.errorHandler))
    .pipe(
      sass.sync({
        outputStyle: config.utils.isProd ? 'compressed' : 'expanded',
        charset: true,
        importer: [
          require('node-sass-package-importer')(),
          require('node-sass-glob-importer')()
        ],
      }).on('error', sass.logError)
    )
    .pipe(postcss([
      autoprefixer({
        cascade: false,
        remove: true
      })
    ]))
    .pipe(replace('/*!', '/*'))
    .pipe(rename(function (p) {
      p.extname = '.css';
    }))
    .pipe(trim())
    .pipe(!config.utils.isProd ? noop() : cleancss({
      compatibility: 'ie11',
      level: {
        1: {
          specialComments: 0
        }
      }
    }))
    .pipe(!config.utils.isProd ? noop() : postcss([
      cssnano({
        discardComments: {
          removeAll: true
        }
      })
    ]))
    .pipe(header(banner.text, banner.data))
    .pipe(config.utils.isProd ? noop() : sourcemaps.init())
    .pipe(config.utils.isProd ? noop() : sourcemaps.write('./maps'))
    .pipe(gulp.dest(sassOpts.compile.dest, {
      overwrite: true
    }));

  // Signal completion
  done();
});

gulp.task('sass-tasks', gulp.series(
  'sass-compile'
));