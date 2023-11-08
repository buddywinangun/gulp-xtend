/**
 * extract.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const deleteLines = require("gulp-delete-lines");
const noop = require("gulp-noop");
const path = require('path');
const replace = require('gulp-replace');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.version(config.project, path);

const extractOpts = {
  compile: {
    dest: opts.build
  }
};

let vendor_css = [],
  vendor_js = [],
  skippedNodeFiles = [],
  skippedFiles = [];

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('extract-node', () => {
  return gulp.src(path.join(extractOpts.compile.dest, '**/*'), {
      allowEmpty: true
    })
    .pipe(deleteLines({
      'filters': [
        new RegExp(config.utils.deleteLine, 'i')
      ]
    }))
    .pipe(replace(new RegExp('(.*?)(\\.+\\/)+' + `(${config.project.paths.assets}vendor|node_modules)` + '\/.*\\.(js|css)', 'g'), function (match, p1, p2, p3, p4) {
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

        return match.replace('node_modules', config.project.paths.assets+'vendor'.replace(extractOpts.compile.dest + '/', ''))
      }

      // Local Vendor
      else {
        if (config.project.skipFilesFromBundle.indexOf(path) < 0) {
          path = path.replace(config.project.paths.assets+'vendor', 'vendor')
          let splite = '../' + extractOpts.compile.dest + path;
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

          let splite = '../' + extractOpts.compile.dest + '*' + splitedPath[0] + '/' + splitedPath[1] + '/' + splitedPath[2] + '/**';
          if (skippedFiles.includes(splite) == false) {
            skippedFiles.push(splite)
          }
        }

        return match
      }
    }))
    // .pipe(replace(new RegExp('(.*?)(\\.+\\/)+(.*?)\\.' + '(' + config.project.fileTypes + '|html' + ')', 'g'), function (match, p1, p2) {
    //   if (p1.search(/(&gt|&lt|<!--|\/\/|\.html)/g) >= 0) return match
    //   if (match.search(/\.html/g) >= 0) return match

    //   path = match.replace(/(\.+\/)+/, '').replace(p1, '')

    //   if (path.search('node_modules') >= 0) {
    //     splitedPath = path.split('/')

    //     let splite = '../' + config.project.dir + splitedPath[0] + '/*' + splitedPath[1] + '/**';
    //     if (skippedNodeFiles.includes(splite) == false) {
    //       skippedNodeFiles.push(splite)
    //     }

    //     return match.replace('node_modules', config.project.paths.assets+'vendor'.replace(extractOpts.compile.dest + '/', ''))
    //   }

    //   return match
    // }))
    .pipe(replace(/<!-- bundlecss:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
      if (vendor_css.length == 0) return '';
      return `<link rel="stylesheet" href="${p1}/${config.project.paths.assets}css/vendor.css${p2.trim()}">`;
    }))
    .pipe(replace(/<!-- bundlejs:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
      if (vendor_js.length == 0) return '';
      return `<script src="${p1}/${config.project.paths.assets}js/vendor.js${p2.trim()}"></script>`;
    }))
    .pipe(!config.project.layoutBuilder.config ? noop() : replace(/\<\/head\>/g, function (math, p1) {
      return `<script>window.config = ${JSON.stringify(config.project)}</script>
        ${!config.project.layoutBuilder.extend.switcherSupport ? `<style>[data-theme-appearance]:not([data-theme-appearance='${config.project.themeAppearance.layoutSkin}']){display:none;}</style>` : ''}</head>`
    }))
    .pipe(gulp.dest(extractOpts.compile.dest, {
      overwrite: true
    }));
});

gulp.task('extract-vendor-css', () => {

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
    .pipe(gulp.dest(path.join(opts.build, config.project.paths.assets, 'css')));
});

gulp.task('extract-vendor-js', () => {

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
    .pipe(gulp.dest(path.join(opts.build, config.project.paths.assets, 'js')));
});

gulp.task('extract-node-files', () => {

  SetskippedNodeFiles = new Set(skippedNodeFiles)

  if ([...SetskippedNodeFiles].length === 0) {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }

  return gulp
    .src([...SetskippedNodeFiles])
    .pipe(gulp.dest(extractOpts.compile.dest))
});

gulp.task('extract-files', () => {

  SetskippedFiles = new Set(skippedFiles)

  if ([...SetskippedFiles].length) {
    return gulp
      .src([...SetskippedFiles])
      .pipe(gulp.dest(extractOpts.compile.dest))
  } else {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }
});

gulp.task('extract-dependencies', () => {

  for (var k in config.project.copyDependencies) {
    path = '../' + config.project.dir + k;

    if (k.search('node_modules') !== 0) {
      path = '../' + config.project.dir + 'src' + '/' + k
    }

    gulp.src(path)
      .pipe(gulp.dest(extractOpts.compile.dest + config.project.copyDependencies[k]))
  }

  return new Promise(function (resolve, reject) {
    resolve();
  });
});

gulp.task('extract-tasks', gulp.series(
  'extract-node',
  'extract-vendor-css',
  'extract-vendor-js',
  'extract-node-files',
  'extract-files',
  'extract-dependencies',
));