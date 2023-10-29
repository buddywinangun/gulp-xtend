/**
 * script.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const header = require("gulp-header");
const sourcemaps = require("gulp-sourcemaps");
const noop = require("gulp-noop");
const plumber = require("gulp-plumber");
const strip = require("gulp-strip-comments");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const path = require("path");
const named = require("vinyl-named");

// -- Config

const config = require('../config');

// -- Js Blundle with webpack

const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('compile-script', done => {

	// Make sure this feature is activated before running
    if (!config.settings.script) return done();

    const dirVersion = config.project.version.output == '' ? '' : config.project.version.output + '/';

    return gulp.src(config.paths.script.input(config.project))
        .pipe(plumber(config.utils.errorHandler))
        .pipe(named())
        .pipe(webpackStream({
            mode: config.utils.isProd ? 'production' : 'development',
            output: {
                chunkFilename: 'module.[hash].js',
                publicPath: dirVersion + "assets/js/",
                path: path.resolve(__dirname, dirVersion + "assets/js"),
            },
            optimization: {
                splitChunks: {
                    chunks: 'all',
                },
            },
        }, webpack))
        .pipe(config.utils.isProd ? noop() : sourcemaps.init())
        .pipe(babel())
        .pipe(terser(config.utils.isProd ? config.uglify.prod : config.uglify.dev))
        .pipe(header(config.project.header.main, {
            package: config.project.data
        }))
        .pipe(strip())
        .pipe(config.utils.isProd ? noop() : sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.paths.script.output(config.project)));
});