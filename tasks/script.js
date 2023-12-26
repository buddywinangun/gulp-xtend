// -- General

const { src, dest } = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const gulpLoadPlugins = require('gulp-load-plugins');
const path = require("path");
const fs = require("fs");
const merge = require('merge-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const $ = gulpLoadPlugins({
  camelize: true,
  rename : {'gulp-util' : 'gutil'}
});

// -- Js Blundle

const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const rollupStream = require('@rollup/stream');
const eslint = require('gulp-eslint');

// -- Registry

function scriptRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts || defaults;
}

util.inherits(scriptRegistry, defaultRegistry);

scriptRegistry.prototype.init = function(gulpInst) {
  const opts = this.opts;

  gulpInst.task('script:lint', () => {
    return src(opts.options.script.files, { allowEmpty: true })
      .pipe(eslint({
        configFile: opts.project.configFile.eslint,
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });

  gulpInst.task('script:compile', () => {
		let files = [];
		const fileList = fs.readdirSync(opts.options.script.files)
		for (const file of fileList) {
			const filePath = `${path.join(opts.options.script.files, file)}`
			const srcExt = `${path.extname(file)}`; // .ext
			if (fs.statSync(filePath).isFile() && srcExt === '.js') {
				files.push(filePath)
			}
		}

		const bundles = files.map(entry => {
			return rollupStream({
				input: entry,
				output: {
					format: 'umd',
					name: 'xtend',
					sourcemap: true
				},
				plugins: [
					babel(opts.options.script.babel_args),
					nodeResolve(opts.options.script.resolve_args),
					commonjs(),
				]
			})
				.pipe(source(path.basename(entry)))
				.pipe(buffer())
				.pipe($.header(opts.options.banner.text, opts.options.banner))
				.pipe(dest(opts.options.script.destination, {overwrite: true}));
		});

		return merge(bundles);
  });

  gulpInst.task('script:minify', () => {
    return src(opts.options.script.destination + '/**/*')
			.pipe($.terser(opts.options.script.min_args))
			.pipe($.rename({ suffix : '.min' }))
      .pipe(dest(opts.options.script.destination));
  });

  gulpInst.task('script:vendor', (cb) => {
		setvendor_script = new Set(opts.vendor_script)

    if ([...setvendor_script].length === 0) return cb();

    src([...setvendor_script])
      .pipe($.concat('vendor.js'))
      .pipe($.terser(opts.options.script.min_args))
      .pipe(dest(opts.options.script.destination));

    cb();
  });
};

exports.registry = scriptRegistry;