const through = require('through2');
const mergeOptions = require('merge-options');
const nunjucks = require('nunjucks');
const path = require('path');
const glob = require('glob');
const config = require('../config');

module.exports = (opts) => {
  const defaults = {
    context: '',
  };
  opts = mergeOptions(defaults, opts);

  return through.obj(function (file, enc, cb) {
    let njkOpts = {
      autoescape: false,
      trimBlocks: true,
      lstripBlocks: true,
      watch: false,
      noCache: true
    };
    let njkContext = {
      ...opts.context
    };

    const env = new nunjucks.Environment([
      new nunjucks.FileSystemLoader([
        file.base,
        ...glob.sync(path.join(file.base, '**/*')),
        ...glob.sync(path.join(config.project.dir, '**/*'))
      ]),
      new nunjucks.NodeResolveLoader()
    ], njkOpts);

    let content = file.contents.toString('utf8');

    try {
      env.renderString(content, njkContext, function (err, res) {
        if (err) {
          console.log(err);
          return cb();
        }

        res = env.renderString(res, njkContext);

        file.contents = new Buffer.from(res);

        return cb(null, file);
      });

    } catch (error) {
      console.error(error);
      return cb();
    }
  });
};