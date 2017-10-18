/**
 * template.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const plumber = require("gulp-plumber");
const deleteLines = require("gulp-delete-lines");
const beautify = require("gulp-jsbeautifier");
const data = require("gulp-data");
const replace = require('gulp-replace');

// -- Config

const config = require('../config');

// -- Templating with nunjuncks

const nunjucksRender = require("gulp-nunjucks-render");

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('compile-template', done => {

  if (!config.settings.template) return done();

  if (config.project.templating == 'nunjucks') {

    return gulp.src(config.paths.template.input(config.project))
      .pipe(plumber(config.utils.errorHandler))
      .pipe(data(function () {
        return config.project;
      }))
      .pipe(nunjucksRender({
        path: [config.paths.template.templates(config.project)]
      }))
      .pipe(beautify({
        html: {
          indent_size: 2,
          indent_char: ' ',
          max_preserve_newlines: 1
        }
      }))
      .pipe(replace(/@@autopath/g, function (match) {
        return config.paths.level(this.file)
      }))
      .pipe(gulp.dest(config.paths.template.output(config.project)));
  }
});