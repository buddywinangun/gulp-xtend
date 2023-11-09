/**
 * script.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const sourcemaps = require("gulp-sourcemaps");
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");
const path = require("path");
const header = require("gulp-header");
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
		src: path.join(opts.src, 'js'),
		dest: path.join(opts.build, config.project.paths.assets, 'js'),
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

	let files = [];
	const fileList = fs.readdirSync(jsOpts.compile.src)
	for (const file of fileList) {
		const filePath = `${path.join(jsOpts.compile.src, file)}`
		const srcExt = `${path.extname(file)}`; // .ext
		if (fs.statSync(filePath).isFile() && srcExt === '.js') {
			files.push(filePath)
		}
	}

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
			.pipe(gulp.dest(jsOpts.compile.dest, {
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