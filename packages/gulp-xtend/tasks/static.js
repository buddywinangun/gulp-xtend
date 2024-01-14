// -- General

const {src, dest} = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins({
  camelize: true,
  rename : {'gulp-util' : 'gutil'}
});

// -- Registry

function staticRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts;
}

util.inherits(staticRegistry, defaultRegistry);

staticRegistry.prototype.init = function (gulpInst) {
  const opts = this.opts;

  // Copy Fonts files
  gulpInst.task('copy:fonts', () => {
    return src(opts.options.static.files + '/fonts' + '/**/*')
      .pipe(dest(opts.options.static.destination + '/fonts'));
  });

  // Optimize Images files
  gulpInst.task('min:image', () => {
    return src(opts.options.static.files + '/images' + '/**/*' , { allowEmpty: true })
      .pipe($.imagemin([
          $.imagemin.gifsicle({ interlaced: true }),
          $.imagemin.mozjpeg({ quality: 70, progressive: true }),
          $.imagemin.optipng({ optimizationLevel: 5, interlaced: true}),
          $.imagemin.svgo({
              plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
      ]))
      .pipe(dest(opts.options.static.destination + '/images'));
  });
};

exports.registry = staticRegistry;