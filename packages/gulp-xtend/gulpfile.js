/**
 * gulpfile.js
 *
 * The gulp task runner file.
 */

/***************************************
 *   Plugins
/***************************************
 *
 * gulp                 : The streaming build system
 * gulp-load-plugins    : Automatically load Gulp plugins
 * gulp-sass            : Compile Sass
 * gulp-sourcemaps      : Create sourcemaps of CSS
 * gulp-rename          : Rename files
 * gulp-csso            : Minify CSS with CSSO
 * gulp-replace         : String replace
 * gulp-pixrem          : Create fallback of rems to pixel
 * gulp-util            : Utility functions
 * gulp-plumber         : Prevent pipe breaking from errors
 * gulp-yaml            : Convert YAML file into JSON
 * gulp-imagemin        : Minify images
 * gulp-uglify          : Minify JavaScript with UglifyJS
 * gulp-twig            : Compile Twig
 * gulp-minify-html     : Minify HTML
 * gulp-stylelint       :
 * gulp-real-favicon    :
 * del                  : Delete files/folders using globs
 * fs                   : File parser
 * autoprefixer         : Prefix CSS
 * browser-sync         : Live CSS Reload & Browser Syncing
 ***************************************/

'use strict';

const { series, registry } = require('gulp');
const gulpWatch = require('gulp').watch;
const browserSync = require('browser-sync').create();

// -- Config

const config = require('./gulp.config');
const alert = require('./lib/alert');
const tasks = [];

// -------------------------------------
//   Task: Template
// -------------------------------------

const template = require('./tasks/template');
registry(new template.registry(config));

const templateTasks = config.options.template.tasks;

if (config.utils.isProd) templateTasks.push('template:minify');
if (config.project.options.template) tasks.push(series(...templateTasks));

// -------------------------------------
//   Task: Favicon
// -------------------------------------

const favicon = require('./tasks/favicon');
registry(new favicon.registry(config));

const faviconTasks = config.options.favicon.tasks;
if (config.utils.isProd && config.project.options.favicon) tasks.push(series(...faviconTasks));

// ---------------------------------------------------
// -- Task: SASS
// ---------------------------------------------------

const sass = require('./tasks/sass');
registry(new sass.registry({
  ...config,
  ...template
}));

const sassTasks = config.options.sass.tasks;

if (!config.project.options.sass_lint) sassTasks.splice(sassTasks.indexOf('sass:lint'), 1);
if (config.utils.isProd) sassTasks.push('sass:minify');
if (config.project.options.sass) tasks.push(series(...sassTasks));

// ---------------------------------------------------
// -- Task: JavaScript
// ---------------------------------------------------

const script = require('./tasks/script');
registry(new script.registry({
  ...config,
  ...template
}));

const scriptTasks = config.options.script.tasks;

if (!config.project.options.script_lint) scriptTasks.splice(scriptTasks.indexOf('script:lint'), 1);
if (config.utils.isProd) scriptTasks.push('script:minify');
if (config.project.options.script) tasks.push(series(...scriptTasks));

// ---------------------------------------------------
// -- Task: Static
// ---------------------------------------------------

const statics = require('./tasks/static');
registry(new statics.registry(config));

const staticTasks = config.options.static.tasks;

if (config.project.options.static) tasks.push(series(...staticTasks));

// ---------------------------------------------------
// -- Task: Copy
// ---------------------------------------------------

const copy = require('./tasks/copy');
registry(new copy.registry({
  ...config,
  ...template
}));

const copyTasks = config.options.copy.tasks;

if (config.project.options.copy) tasks.push(series(...copyTasks));

// -------------------------------------
//   Task: Clean
// -------------------------------------

const clean = require('./tasks/clean');
registry(new clean.registry(config));

// -------------------------------------
//   Task: Definitions
// -------------------------------------

if (tasks.length === 0) {
  const errorTasks = (cb) => {
    alert.error();
    cb();
  };
  errorTasks.displayName = 'error:tasks';
  tasks.splice(0, tasks.length);
  tasks.push(errorTasks);
} else {
  tasks.unshift('clean');
}

const build = series(tasks);
const serve = series(browser, watch);

function browser(cb) {
  browserSync.init(config.options.browsersync.args);
  cb();
};

function reload(cb) {
  browserSync.reload();
  cb();
};

function watch() {
  let watchFiles = config.options.watch.files();
  watchFiles.forEach((files, index) =>
    gulpWatch(files, series(config.options.watch.run()[ index ], reload))
  );
};

exports.build = build;
exports.watch = watch;
exports.default = series(build, serve);