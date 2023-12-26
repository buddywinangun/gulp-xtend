const through = require('through2');
const mergeOptions = require('merge-options');
const nunjucks = require('nunjucks');
const path = require('path');
const glob = require('glob');
const config = require('../gulp.config');

module.exports = (opts) => {
  return through2.obj(function(file, _, cb) {
    try {
      if (file.isBuffer()) {
      }
      let content = file.contents.toString();
      file.contents = Buffer.from(content);
      return cb(null, file);

    } catch (error) {
      console.error(error);
      return cb();
    }
  })
};