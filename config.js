/**
 * config.js
 *
 * The gulp configuration file.
 */

const cli = require('./lib/cli');
const notify = require("gulp-notify");
const path = require("path");

// -- ErrorHandler

const errorHandler = err => {
  notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString(),
    sound: "Beep"
  })(err);
};

// -- Validate Path

const confProject = require(path.join(cli.cwd, 'config'));
const dataProject = require(path.join(cli.cwd, 'package.json'));

module.exports = {

  //
  // Settings | Turn on/off build features
  //

  settings: {
    svgs: true,
    sass: true,
    clean: true,
    script: true,
    static: true,
    reload: true,
    template: true,
  },

  //
  // Get of configuration project
  //

  project: {
    data: dataProject,
    dir: cli.cwd,
    ...confProject,
  },

  //
  // util config
  //

  utils: {
    deleteLine: "builder:delete",
    isProd: cli.production === true,
    errorHandler,
  },

  //
  // path config | setup of path src or dist file
  //

  paths: {

    version: (data, path) => {
      let version = {
        src: path.join(cli.cwd, data.version.input, confProject.paths.source),
        build: path.join(cli.cwd, data.version.input, confProject.paths.build)
      };

      return version;
    },

    level: (file) => {
      relativePathLevels = file.relative.split(/\/|\\/).length - 1;

      let level = '';

      if (relativePathLevels) {
        for (let i = 0; i < relativePathLevels; i++) {
          if (relativePathLevels === i + 1) {
            level = level + '..'
          } else {
            level = level + '../'
          }
        }
      } else {
        level = '.'
      }

      return path.join(level, confProject.paths.assets);
    }
  },
};