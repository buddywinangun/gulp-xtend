/**
 * config.js
 *
 * The gulp configuration file.
 */

const path = require('./config/path');
const cli = require('./config/command');
const directoryExists = require("directory-exists");
const fs = require("fs");
const notify = require("gulp-notify");

// -- ErrorHandler

const errorHandler = err => {
  notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString(),
    sound: "Beep"
  })(err);
};

// -- Validate Project Available

const nameProject = cli.project && typeof cli.project != "undefined" ? cli.project : '';
const dirProject = path.projects + nameProject;
const isDir = nameProject.length > 1 ? directoryExists.sync(dirProject) : false;
const confProject = isDir ? require(dirProject + '/config') : require("./start/config");
const dataProject = fs.existsSync(dirProject + '/package.json') ? require(dirProject + '/package.json') : require("./package.json");

module.exports = {

  //
  // path config | setup of path src or dist file
  //

  paths: {
    ...path,
  },

  //
  // util config
  //

  utils: {
    errorHandler,
    deleteLine: "builder:delete",
  },

  //
  // Settings | Turn on/off build features
  //

  settings: {
    clean: true,
    static: true,
    template: true,
  },

  //
  // Get of configuration project
  //

  project: {
    isDir: isDir,
    name: nameProject,
    dir: dirProject,
    data: dataProject,
    ...confProject,
  },
};