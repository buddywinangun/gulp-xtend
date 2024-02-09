#!/usr/bin/env node

'use strict';
const commander = require('commander');
const spawn = require('cross-spawn');
const pkg = require('./package.json');

const program = new commander.Command();

program
  .storeOptionsAsProperties(true)
  .name('gulp-xtend')
  .usage('[options]')
  .option('--production', 'set mode: "production" (minification)', 'production')
  .option('--gulpfile <gulpfile>', 'custom gulpfile')
  .option('--task <task>', 'custom Task')
  .option('--cwd <path>', 'custom CWD')
  .option('-v, --version', 'show version number', pkg.version)
  .parse(process.argv);

const opts = [];
const gulpfile = program.gulpfile ? program.gulpfile : 'node_modules/@buddywinangun/gulp-xtend/gulpfile.js';
const cwd = program.cwd ? program.cwd : process.cwd();

if (program.production === true) opts.push('--production');
opts.push('--gulpfile', gulpfile);
opts.push('--cwd', cwd);

if (program.task !== undefined) {
  spawn('gulp', [program.task, '--color', ...opts], {
    stdio: 'inherit',
    cwd: cwd
  });
} else {
  spawn('gulp', ['--color', ...opts], {
    stdio: 'inherit',
    cwd: cwd
  });
}