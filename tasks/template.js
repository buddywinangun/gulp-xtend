/**
 * template.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const plumber = require("gulp-plumber");
const deleteLines = require("gulp-delete-lines");
const replace = require('gulp-replace');
const noop = require("gulp-noop");
const path = require('path');
const rename = require("gulp-rename");
const trim = require('../helpers/trim');

// -- Compile

const templateCompile = require('../helpers/template');
const beautify = require("gulp-jsbeautifier");

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.template(config.project);

const templateOpts = {
  compile: {
    src: [
      path.join(process.cwd(), opts.src, '**/*.html'),
      '!' + path.join(process.cwd(), opts.src, 'template/**/*.html'),
      '!' + path.join(process.cwd(), opts.src, '**/_*.html')
    ],
    dest: path.join(process.cwd(), opts.build),
    opts: {
      context: config.project,
    }
  }
};

let vendor_css = [],
  vendor_js = [],
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
    return gulp.src(templateOpts.compile.src, {
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
      .pipe(gulp.dest(templateOpts.compile.dest, {
        overwrite: true
      }));
  }

	// Signal completion
	done();
});

gulp.task('template-node', () => {
  return gulp.src(path.join(templateOpts.compile.dest, '**/*'), {
      allowEmpty: true
    })
    .pipe(replace(/@@autopath/g, function (match) {
      return config.paths.level(this.file)
    }))
    .pipe(deleteLines({
      'filters': [
        new RegExp(config.utils.deleteLine, 'i')
      ]
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

    //     return match.replace('node_modules', 'assets/vendor'.replace(config.paths.build(config.project) + '/', ''))
    //   }

    //   return match
    // }))
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
    .pipe(gulp.dest(templateOpts.compile.dest, {
      overwrite: true
    }));
});

gulp.task('template-bundle-vendor-css', () => {

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

gulp.task('template-bundle-vendor-js', () => {

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

gulp.task('template-copy-skipped-node-files', () => {

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

gulp.task('template-copy-skipped-files', () => {

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

gulp.task('template-copy-dependencies', () => {

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

gulp.task('template-tasks', gulp.series(
  'template-compile',
  'template-node',
  'template-bundle-vendor-css',
  'template-bundle-vendor-js',
  'template-copy-skipped-node-files',
  'template-copy-skipped-files',
  'template-copy-dependencies',
));