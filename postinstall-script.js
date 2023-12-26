// postinstall-script.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */
'use strict';

const fs = require("fs");
const path = require("path");

if(__dirname.includes('node_modules') && fs.existsSync(path.join(__dirname.split('node_modules')[0], 'config.js')) === false) {
  // Moving files to user's local directory
  fs.cpSync(__dirname + '/start', __dirname.split('node_modules')[0], {
    recursive: true
  });
}
