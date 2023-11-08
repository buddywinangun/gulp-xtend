/**
 * template.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const plumber = require("gulp-plumber");
const replace = require('gulp-replace');
const path = require('path');
const rename = require("gulp-rename");
const trim = require('../lib/trim');

// -- Compile

const templateCompile = require('../lib/template');
const beautify = require("gulp-jsbeautifier");

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.version(config.project, path);

const templateOpts = {
  compile: {
    src: [
      path.join(opts.src, '**/*.html'),
      '!' + path.join(opts.src, 'template/**/*.html'),
      '!' + path.join(opts.src, '**/_*.html')
    ],
    dest: opts.build,
    opts: {
      context: config.project,
    }
  }
};

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('template-compile', done => {

  // Make sure this feature is activated before running
  if (!config.settings.template) return done();

  // theme.ext
  let buildExt = '.html'; // .ext

  if (config.project.templating == 'nunjucks') {
    gulp.src(templateOpts.compile.src, {
        allowEmpty: true
      })
      .pipe(plumber(config.utils.errorHandler))
      .pipe(templateCompile(templateOpts.compile.opts))
      .pipe(beautify({
        html: {
          indent_size: 2,
          indent_char: ' ',
          max_preserve_newlines: 1
        }
      }))
      .pipe(rename(function (p) {
        p.extname = buildExt;
      }))
      .pipe(trim())
      .pipe(replace(/@@autopath/g, function (match) {
        return config.paths.level(this.file)
      }))
      .pipe(gulp.dest(templateOpts.compile.dest, {
        overwrite: true
      }));
  }

  // Signal completion
  done();
});

gulp.task('template-tasks', gulp.series(
  'template-compile'
));