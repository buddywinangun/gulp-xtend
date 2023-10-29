/**
 * path.js
 *
 * The gulp path file.
 */

const cli = require('../helpers/cli');
const directoryExists = require("directory-exists");
const fs = require("fs");

// -- Validate Project Available

const nameProject = cli.project && typeof cli.project != "undefined" ? cli.project : '';
const dirProject = path.projects + nameProject;
const isDir = nameProject.length > 1 ? directoryExists.sync(dirProject) : false;
const confProject = isDir ? require(dirProject + '/config') : require("./start/config");
const dataProject = fs.existsSync(dirProject + '/package.json') ? require(dirProject + '/package.json') : require("./package.json");

module.exports = {
  isDir: isDir,
  name: nameProject,
  dir: dirProject,
  data: dataProject,
  banner: dirProject + '/banner.txt',
  ...confProject,
};