// -- General

const util = require('util');
const defaultRegistry = require('undertaker-registry');
const alert = require('../lib/alert');

// -- Delete

const del = require("del");

// -- Registry

function cleanRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts;
}

util.inherits(cleanRegistry, defaultRegistry);

cleanRegistry.prototype.init = function (gulpInst) {
  const opts = this.opts;

  gulpInst.task('clean', (cb) => {
    del.sync(opts.options.clean.dist.files, {force: true});
    cb();
  });
};

exports.registry = cleanRegistry;