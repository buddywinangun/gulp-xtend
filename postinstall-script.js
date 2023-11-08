// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */
'use strict';

const fs = require("fs");
const path = require("path");

// User's local directory
const userPath = process.env.INIT_CWD

if(__dirname.includes('node_modules')
  && fs.existsSync(path.join(userPath, 'config.js')) === false) {
  // Moving files to user's local directory
  fs.cpSync('start', userPath, {
    recursive: true
  });
}
