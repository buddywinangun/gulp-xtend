// -- General

const { src, dest } = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const gulpLoadPlugins = require('gulp-load-plugins');
const trim = require('../lib/trim');
const alert = require('../lib/alert');
const $ = gulpLoadPlugins({
  camelize: true,
  rename : {'gulp-util' : 'gutil'}
});

// -- SASS

const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("autoprefixer");
const stylelint = require('gulp-stylelint');
const cleancss = require('gulp-clean-css');

// -- Registry

function sassRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts || defaults;
}

util.inherits(sassRegistry, defaultRegistry);

sassRegistry.prototype.init = function(gulpInst) {
  const opts = this.opts;

  alert.log(opts.options.sass.message, 'writing');

  gulpInst.task('sass:lint', () => {
    return src(opts.options.sass.files, { allowEmpty: true })
      .pipe(stylelint({
        configFile: opts.project.configFile.stylelint,
      }));
  });

  gulpInst.task('sass:compile', () => {
    return src(opts.options.sass.files, { sourcemaps: true })
      .pipe($.plumber({ errorHandler: alert.error }))
      // .pipe($.sourcemaps.init())
      .pipe(sass(opts.options.sass.sass_args).on('error', sass.logError))
      // .pipe($.combineMq(opts.options.sass.combineMq_args))
      // .pipe($.replace(/\{\*timestamp\*\}/g, opts.timestamp))
      .pipe($.pixrem())
      .pipe($.postcss([autoprefixer(opts.options.sass.autoprefixer_args)]))
      // .pipe($.sourcemaps.write('.', opts.options.sass.sourcemaps_args))
      .pipe($.header(opts.options.banner.text, opts.options.banner))
      .pipe(trim())
      .pipe(dest(opts.options.sass.destination, { overwrite: true, sourcemaps: '.' }));
  });

  gulpInst.task('sass:minify', () => {
    return src([
      opts.options.sass.destination + '/**/*',
      '!' + opts.options.sass.destination + '/**/*.map',
    ])
      .pipe($.rename({ suffix : '.min' }))
      .pipe(cleancss(opts.options.sass.min_args))
      .pipe(dest(opts.options.sass.destination));
  });

  gulpInst.task('sass:vendor', (cb) => {
    setvendor_style = new Set(opts.vendor_style)

    if ([...setvendor_style].length === 0) return cb();

    src([...setvendor_style])
      .pipe($.concat('vendor.css'))
      .pipe(cleancss(opts.options.sass.min_args))
      .pipe(dest(opts.options.sass.destination));

    cb();
  });
};

exports.registry = sassRegistry;