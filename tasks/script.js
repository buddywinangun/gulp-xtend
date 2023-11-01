/**
 * script.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");
const path = require("path");
const header = require("gulp-header");
const glob = require('glob');
const stripIndent = require('strip-indent');
const fs = require("fs");
const trim = require('../lib/trim');
const merge = require('merge-stream');

// -- Js Blundle

const rollupStream = require('@rollup/stream');
const {
	babel
} = require('@rollup/plugin-babel');
const {
	nodeResolve
} = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const globImport = require('rollup-plugin-glob-import');
const globals = require('rollup-plugin-node-globals');
const terser = require("gulp-terser");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// ---------------------------------------------------
// -- Config
// ---------------------------------------------------

const config = require('../config');

const opts = config.paths.version(config.project, path);

const jsOpts = {
	compile: {
		src: {
			dir: path.join(opts.src, 'js/index.js'),
			filename: 'index.js',
		},
		dest: {
			dir: path.join(opts.build, 'assets/js'),
			filename: 'script.js',
		},
		banner: {
			text: config.project.banner,
			data: config.project
		}
	}
};

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('script-compile', (done) => {

	// Make sure this feature is activated before running
	if (!config.settings.script) return done();

	// index.ext
	let srcExt = path.extname(jsOpts.compile.src.filename); // .ext
	let srcName = path.basename(jsOpts.compile.src.filename, srcExt); // index
	// script.ext
	let buildExt = path.extname(jsOpts.compile.dest.filename); // .ext
	let buildName = path.basename(jsOpts.compile.dest.filename, buildExt); // script

	const variant = path.join(jsOpts.compile.src.dir, srcName + '-*' + srcExt);

	const files = [
		jsOpts.compile.src.dir,
		...glob.sync(variant)
	];

	const banner = {
		text: stripIndent(
			fs.readFileSync(jsOpts.compile.banner.text, 'utf8').trim()
		) + '\n\n',
		data: jsOpts.compile.banner.data
	};

	const bundles = files.map(entry => {

		const options = {
			input: entry,
			output: {
				format: 'umd',
				sourcemap: true
			},
			plugins: [
				babel({
					presets: [
						[
							'@babel/preset-env',
							{
								loose: true,
								bugfixes: true,
								modules: false
							}
						]
					],
					babelHelpers: 'bundled',
					compact: true,
					exclude: 'node_modules/**'
				}),
				nodeResolve(),
				commonjs(),
				globImport(),
				globals()
			]
		};

		return rollupStream(options)
			.pipe(plumber(config.utils.errorHandler))
			.pipe(source(path.basename(entry)))
			.pipe(buffer())
			.pipe(rename(function (p) {
				p.basename = p.basename.replace(srcName + '-', buildName + '-');
				p.basename = p.basename.replace(srcName, buildName);
				p.extname = buildExt;
			}))
			.pipe(trim())
			.pipe(!config.utils.isProd ? noop() : terser({
				mangle: true,
				compress: {
					typeofs: false
				},
				format: {
					comments: false
				},
				sourceMap: false
			}))
			.pipe(header(banner.text, banner.data))
			.pipe(config.utils.isProd ? noop() : sourcemaps.init({
				loadMaps: true
			}))
			.pipe(config.utils.isProd ? noop() : sourcemaps.write('./maps'))
			.pipe(gulp.dest(jsOpts.compile.dest.dir, {
				overwrite: true
			}));
	});

	merge(bundles);

	// Signal completion
	done();
});

gulp.task('script-tasks', gulp.series(
	'script-compile',
));