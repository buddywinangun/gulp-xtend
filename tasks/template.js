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
let vendor_css = [],
  vendor_js = [],
  skippedNodeFiles = [],
  skippedFiles = [];

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
      .pipe(replace(new RegExp('(.*?)(\\.+\\/)+' + `(assets/vendor|node_modules)` + '\/.*\\.(js|css)', 'g'), function (match, p1, p2, p3, p4) {
        if (p1.search(/(&gt|&lt|<!--|\/\/)/g) >= 0) return match;

        path = match.replace(/(\.+\/)+/, '').replace(p1, '')

        // Node Modules Vendor
        if (path.search('node_modules') === 0) {
          if (config.project.skipFilesFromBundle.indexOf(path) < 0) {
            let splite = '../' + config.project.dir + path;
            if (p4 === "css") {
              if (vendor_css.includes(splite) == false) {
                vendor_css.push(splite)
              }
            } else {
              if (vendor_js.includes(splite) == false) {
                vendor_js.push(splite)
              }
            }

            return match + " " + config.deleteLine
          } else {
            splitedPath = path.split('/')

            let splite = '../' + config.project.dir + splitedPath[0] + '/*' + splitedPath[1] + '/**';
            if (skippedNodeFiles.includes(splite) == false) {
              skippedNodeFiles.push(splite)
            }
          }

          return match.replace('node_modules', 'assets/vendor'.replace(config.paths.build(config.project) + '/', ''))
        }

        // Local Vendor
        else {
          if (config.project.skipFilesFromBundle.indexOf(path) < 0) {
            path = path.replace('assets/vendor', 'vendor')
            let splite = '../' + config.paths.watch(config.project) + path;
            if (p4 === "css") {
              if (vendor_css.includes(splite) == false) {
                vendor_css.push(splite)
              }
            } else {
              if (vendor_js.includes(splite) == false) {
                vendor_js.push(splite)
              }
            }

            return match + " " + config.deleteLine
          } else {
            splitedPath = path.split('/')

            let splite = '../' + config.paths.build(config.project) + '*' + splitedPath[0] + '/' + splitedPath[1] + '/' + splitedPath[2] + '/**';
            if (skippedFiles.includes(splite) == false) {
              skippedFiles.push(splite)
            }
          }

          return match
        }
      }))
      .pipe(replace(new RegExp('(.*?)(\\.+\\/)+(.*?)\\.' + '(' + config.project.fileTypes + '|html' + ')', 'g'), function (match, p1, p2) {
        if (p1.search(/(&gt|&lt|<!--|\/\/|\.html)/g) >= 0) return match
        if (match.search(/\.html/g) >= 0) return match

        path = match.replace(/(\.+\/)+/, '').replace(p1, '')

        if (path.search('node_modules') >= 0) {
          splitedPath = path.split('/')

          let splite = '../' + config.project.dir + splitedPath[0] + '/*' + splitedPath[1] + '/**';
          if (skippedNodeFiles.includes(splite) == false) {
            skippedNodeFiles.push(splite)
          }

          return match.replace('node_modules', 'assets/vendor'.replace(config.paths.build(config.project) + '/', ''))
        }

        return match
      }))
      .pipe(deleteLines({
        'filters': [
          new RegExp(config.utils.deleteLine, 'i')
        ]
      }))
      .pipe(replace(/<!-- bundlecss:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
        if (vendor_css.length == 0) return '';
        return `<link rel="stylesheet" href="${p1}/assets/css/vendor.css${p2.trim()}">`;
      }))
      .pipe(replace(/<!-- bundlejs:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
        if (vendor_js.length == 0) return '';
        return `<script src="${p1}/assets/js/vendor.js${p2.trim()}"></script>`;
      }))
      .pipe(!config.project.layoutBuilder.config ? noop() : replace(/\<\/head\>/g, function (math, p1) {
        return `<script>window.config = ${JSON.stringify(config.project)}</script>
          ${!config.project.layoutBuilder.extend.switcherSupport ? `<style>[data-theme-appearance]:not([data-theme-appearance='${config.project.themeAppearance.layoutSkin}']){display:none;}</style>` : ''}</head>`
      }))
      .pipe(gulp.dest(config.paths.template.output(config.project)));
  }
});

gulp.task('bundle-vendor-css', done => {

  setvendor_css = new Set(vendor_css)

  if ([...setvendor_css].length === 0) {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }

  return gulp
    .src([...setvendor_css])
    .pipe(cleanCSS({
      compatibility: 'ie11'
    }))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(config.paths.style.output(config.project)));
});

gulp.task('bundle-vendor-js', done => {

  setvendor_js = new Set(vendor_js)

  if ([...setvendor_js].length === 0) {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }

  return gulp
    .src([...setvendor_js], {
      allowEmpty: true,
    })
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.script.output(config.project)));
});

gulp.task('copySkippedNodeFiles', done => {

  SetskippedNodeFiles = new Set(skippedNodeFiles)

  if ([...SetskippedNodeFiles].length === 0) {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }

  return gulp
    .src([...SetskippedNodeFiles])
    .pipe(gulp.dest(config.paths.vendor(config.project)))
});

gulp.task('copySkippedFiles', done => {

  SetskippedFiles = new Set(skippedFiles)

  if ([...SetskippedFiles].length) {
    return gulp
      .src([...SetskippedFiles])
      .pipe(gulp.dest(config.paths.build(config.project)))
  } else {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }
});

gulp.task('copyDependencies', done => {

  for (var k in config.project.copyDependencies) {
    path = '../' + config.project.dir + k;

    if (k.search('node_modules') !== 0) {
      path = '../' + config.project.dir + 'src' + '/' + k
    }

    gulp.src(path)
      .pipe(gulp.dest(config.paths.build(config.project) + config.project.copyDependencies[k]))
  }

  return new Promise(function (resolve, reject) {
    resolve();
  });
});