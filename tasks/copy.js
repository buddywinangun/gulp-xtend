// -- General

const {src, dest} = require('gulp');
const path = require('path');
const util = require('util');
const defaultRegistry = require('undertaker-registry');

// -- Registry

function copyRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts;
}

util.inherits(copyRegistry, defaultRegistry);

copyRegistry.prototype.init = function (gulpInst) {
  const opts = this.opts;

  gulpInst.task('copy:dependencies', (cb) => {
    for (var k in opts.project.copyDependencies) {
      getpath = path.join(opts.project.dir, k);

      if (k.search('node_modules') !== 0) {
        getpath = path.join(opts.project.dir, k);
      }

      src(getpath)
        .pipe(dest(path.join(opts.options.copy.destination, opts.project.copyDependencies[k])))
    }
    cb();
  });

  gulpInst.task('copy:skippedNodeFiles', (cb) => {
    SetskippedNodeFiles = new Set(opts.skippedNodeFiles)

    if ([...SetskippedNodeFiles].length === 0) return cb();

    src([...SetskippedNodeFiles])
      .pipe(dest(opts.options.copy.destination));
    cb();
  });

  gulpInst.task('copy:skippedFiles', (cb) => {
    SetskippedFiles = new Set(opts.skippedFiles)

    if ([...SetskippedFiles].length === 0) return cb();

    src([...SetskippedFiles])
      .pipe(dest(opts.options.copy.destination));
    cb();
  });
};

exports.registry = copyRegistry;