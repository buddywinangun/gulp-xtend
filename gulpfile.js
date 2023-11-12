/**
 * gulpfile.js
 *
 * The gulp task runner file.
 */

'use strict';

// -- General

const gulp = require('gulp');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

require('./tasks/clean');
require('./tasks/template');
require('./tasks/sass');
require('./tasks/script');
require('./tasks/svgs');
require('./tasks/static');
require('./tasks/extract');
require('./tasks/syncs');

// ---------------------------------------------------
// -- Task Definitions
// ---------------------------------------------------

gulp.task('default', gulp.series('clean', 'compile'));