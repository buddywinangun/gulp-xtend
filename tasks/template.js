// -- General

const { src, dest } = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const gulpLoadPlugins = require('gulp-load-plugins');
const replace = require('gulp-replace');
const fs = require('fs');
const path = require('path');
const deleteLines = require("gulp-delete-lines");
const alert = require('../lib/alert');
const $ = gulpLoadPlugins({
  camelize: true,
  rename : {'gulp-util' : 'gutil'}
});

// -- Twig
const {TwingEnvironment, TwingLoaderRelativeFilesystem} = require('twing');
let env = new TwingEnvironment(new TwingLoaderRelativeFilesystem(), {debug:true});
env.on('template', () => env.loadedTemplates.clear())

// -- Registry

function templateRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts;
}

util.inherits(templateRegistry, defaultRegistry);

templateRegistry.prototype.init = function (gulpInst) {
  const opts = this.opts;

  let vendor_style = [],
  vendor_script = [],
  skippedNodeFiles = [],
  skippedFiles = [];

  exports.vendor_style = vendor_style;
  exports.vendor_script = vendor_script;
  exports.skippedNodeFiles = skippedNodeFiles;
  exports.skippedFiles = skippedFiles;

  gulpInst.task('template:data', () => {
    return src(opts.options.template.json.files, { allowEmpty: true })
      .pipe($.plumber({ errorHandler: alert.error }))
      .pipe($.concat(opts.options.template.json.file))
      .pipe(dest( opts.options.template.json.destination ))
      .pipe($.yaml())
      .pipe(dest('./'));
  });

  gulpInst.task('template:compile', () => {
    return src(opts.options.template.files)
      .pipe($.twing(env,
        {...JSON.parse(fs.readFileSync(opts.project.configFile.data, 'utf-8').toString()), ...opts.project},
        {outputExt: opts.options.template.extname}))
      .pipe(dest(opts.options.template.destination));
  });

  gulpInst.task('template:minify', () => {
    return src(opts.options.template.destination + '/**/*.html')
      .pipe($.minifyHtml(opts.options.template.min_args))
      .pipe(dest(opts.options.template.destination));
  });

  gulpInst.task('template:extract', () => {
    return src(opts.options.template.destination + '/**/*.html', {
        allowEmpty: true
      })
      .pipe(replace(/@@autopath/g, function (match) {
        return opts.paths.level(this.file)
      }))
      .pipe(replace(new RegExp('(.*?)(\\.+\\/)+' + `(${opts.project.assets.dir}vendor|node_modules)` + '\/.*\\.(js|css)', 'g'), function (match, p1, p2, p3, p4) {
        if (p1.search(/(&gt|&lt|<!--|\/\/)/g) >= 0) return match;

        getpath = match.replace(/(\.+\/)+/, '').replace(p1, '')

        // Node Modules Vendor
        if (getpath.search('node_modules') === 0) {
          if (opts.project.skipFilesFromBundle.indexOf(getpath) < 0) {
            let splite = path.join(opts.project.dir, getpath);
            if (p4 === "css") {
              if (vendor_style.includes(splite) == false) {
                vendor_style.push(splite)
              }
            } else {
              if (vendor_script.includes(splite) == false) {
                vendor_script.push(splite)
              }
            }

            return match + " " + opts.utils.deleteLine
          } else {
            splitedPath = getpath.split('/')

            let splite = path.join(opts.project.dir, splitedPath[0], '*' + splitedPath[1], '**');
            if (skippedNodeFiles.includes(splite) == false) {
              skippedNodeFiles.push(splite)
            }
          }

          return match.replace('node_modules', opts.project.assets.dir + 'vendor'.replace(opts.options.template.destination + '/', ''))
        }

        // Local Vendor
        else {
          if (opts.project.skipFilesFromBundle.indexOf(getpath) < 0) {
            getpath = getpath.replace(opts.project.assets.dir + 'vendor', 'vendor')
            let splite = path.join(opts.project.assets.src.dir, getpath);
            if (p4 === "css") {
              if (vendor_style.includes(splite) == false) {
                vendor_style.push(splite)
              }
            } else {
              if (vendor_script.includes(splite) == false) {
                vendor_script.push(splite)
              }
            }

            return match + " " + opts.utils.deleteLine
          } else {
            splitedPath = getpath.split('/')

            let splite = path.join(opts.project.assets.src.dir, splitedPath[0], '*' + splitedPath[1], splitedPath[2], '**');
            if (skippedFiles.includes(splite) == false) {
              skippedFiles.push(splite)
            }
          }

          return match
        }
      }))
      .pipe(replace(new RegExp('(.*?)(\\.+\\/)+(.*?)\\.' + '(' + opts.project.options.fileTypes + '|html' + ')', 'g'), function (match, p1, p2) {
        if (p1.search(/(&gt|&lt|<!--|\/\/|\.html)/g) >= 0) return match
        if (match.search(/\.html/g) >= 0) return match

        getpath = match.replace(/(\.+\/)+/, '').replace(p1, '')

        if (getpath.search('node_modules') >= 0) {
          splitedPath = getpath.split('/')

          let splite = path.join(opts.project.dir, splitedPath[0], '*' + splitedPath[1] + '**');
          if (skippedNodeFiles.includes(splite) == false) {
            skippedNodeFiles.push(splite)
          }

          return match.replace('node_modules', opts.project.assets.dir + 'vendor'.replace(opts.options.template.destination + '/', ''))
        }

        return match
      }))
      .pipe(deleteLines({
        'filters': [
          new RegExp(opts.utils.deleteLine, 'i')
        ]
      }))
      .pipe(replace(/<!-- bundlecss:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
        if (vendor_style.length == 0) return ' ';
        return `<link rel="stylesheet" href="${p1}/${opts.project.assets.dir}css/vendor.css${p2.trim()}">`;
      }))
      .pipe(replace(/<!-- bundlejs:vendor \[(.*?)\](.*)-->/g, function (math, p1, p2) {
        if (vendor_script.length == 0) return ' ';
        return `<script src="${p1}/${opts.project.assets.dir}js/vendor.js${p2.trim()}"></script>`;
      }))
      .pipe(dest(opts.options.template.destination));
  });
};

exports.registry = templateRegistry;