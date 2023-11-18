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
const deleteLines = require("gulp-delete-lines");

// -- Compile

const templateCompile = require('../lib/template');
const beautify = require("gulp-jsbeautifier");

// -- Extra

const cleancss = require("gulp-clean-css");
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

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

let vendor_style = [],
  vendor_script = [],
  skippedNodeFiles = [],
  skippedFiles = [];

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
      .pipe(replace(new RegExp('(.*?)(\\.+\\/)+' + `(${config.project.paths.assets}vendor|node_modules)` + '\/.*\\.(js|css)', 'g'), function (match, p1, p2, p3, p4) {
        if (p1.search(/(&gt|&lt|<!--|\/\/)/g) >= 0) return match;

        getpath = match.replace(/(\.+\/)+/, '').replace(p1, '')

        // Node Modules Vendor
        if (getpath.search('node_modules') === 0) {
          if (config.project.skipFilesFromBundle.indexOf(getpath) < 0) {
            let splite = path.join(config.project.dir, getpath);
            if (p4 === "css") {
              if (vendor_style.includes(splite) == false) {
                vendor_style.push(splite)
              }
            } else {
              if (vendor_script.includes(splite) == false) {
                vendor_script.push(splite)
              }
            }

            return match + " " + config.utils.deleteLine
          } else {
            splitedPath = getpath.split('/')

            let splite = path.join(config.project.dir, splitedPath[0], '*' + splitedPath[1], '**');
            if (skippedNodeFiles.includes(splite) == false) {
              skippedNodeFiles.push(splite)
            }
          }

          return match.replace('node_modules', config.project.paths.assets + 'vendor'.replace(templateOpts.compile.dest + '/', ''))
        }

        // Local Vendor
        else {
          if (config.project.skipFilesFromBundle.indexOf(getpath) < 0) {
            getpath = getpath.replace(config.project.paths.assets + 'vendor', 'vendor')
            let splite = path.join(opts.src, getpath);
            if (p4 === "css") {
              if (vendor_style.includes(splite) == false) {
                vendor_style.push(splite)
              }
            } else {
              if (vendor_script.includes(splite) == false) {
                vendor_script.push(splite)
              }
            }

            return match + " " + config.utils.deleteLine
          } else {
            splitedPath = getpath.split('/')

            let splite = path.join(opts.src, splitedPath[0], '*' + splitedPath[1], splitedPath[2], '**');
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

        getpath = match.replace(/(\.+\/)+/, '').replace(p1, '')

        if (getpath.search('node_modules') >= 0) {
          splitedPath = getpath.split('/')

          let splite = path.join(config.project.dir, splitedPath[0], '*' + splitedPath[1] + '**');
          if (skippedNodeFiles.includes(splite) == false) {
            skippedNodeFiles.push(splite)
          }

          return match.replace('node_modules', config.project.paths.assets + 'vendor'.replace(templateOpts.compile.dest + '/', ''))
        }

        return match
      }))
      .pipe(deleteLines({
        'filters': [
          new RegExp(config.utils.deleteLine, 'i')
        ]
      }))
      .pipe(replace(/<!-- bundlecss:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
        if (vendor_style.length == 0) return ' ';
        return `<link rel="stylesheet" href="${p1}/${config.project.paths.assets}css/vendor.css${p2.trim()}">`;
      }))
      .pipe(replace(/<!-- bundlejs:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
        if (vendor_script.length == 0) return ' ';
        return `<script src="${p1}/${config.project.paths.assets}js/vendor.js${p2.trim()}"></script>`;
      }))
      .pipe(gulp.dest(templateOpts.compile.dest, {
        overwrite: true
      }));
  }

  // Signal completion
  done();
});

gulp.task('extract-vendor-css', (done) => {

  setvendor_style = new Set(vendor_style)

  if ([...setvendor_style].length === 0) return done();

  gulp
    .src([...setvendor_style])
    .pipe(cleancss({
      compatibility: 'ie11'
    }))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.join(templateOpts.compile.dest, config.project.paths.assets, 'css')));

  // Signal completion
  done();
});

gulp.task('extract-vendor-js', (done) => {

  setvendor_script = new Set(vendor_script)

  if ([...setvendor_script].length === 0) return done();

  gulp
    .src([...setvendor_script], {
      allowEmpty: true,
    })
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(templateOpts.compile.dest, config.project.paths.assets, 'js')));

  done();
});

gulp.task('extract-node-files', (done) => {

  SetskippedNodeFiles = new Set(skippedNodeFiles)

  if ([...SetskippedNodeFiles].length === 0) return done();

  gulp
    .src([...SetskippedNodeFiles])
    .pipe(gulp.dest(path.join(templateOpts.compile.dest, config.project.paths.assets, 'vendor')));

  done();
});

gulp.task('extract-files', (done) => {

  SetskippedFiles = new Set(skippedFiles)

  if ([...SetskippedFiles].length === 0) return done();

  gulp
    .src([...SetskippedFiles])
    .pipe(gulp.dest(path.join(templateOpts.compile.dest, config.project.paths.assets, 'vendor')));

  done();
});

gulp.task('template-tasks', gulp.series(
  'template-compile',
  'extract-vendor-css',
  'extract-vendor-js',
  'extract-node-files',
  'extract-files',
));