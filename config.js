/**
 * config.js
 *
 * The gulp configuration file.
 */

const path = require('./config/path');
const error = require('./config/error');
const project = require('./config/project');

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
    ...project
  },

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
    deleteLine: "builder:delete",
    isProd: cli.prod === true,
    ...error
  },
};