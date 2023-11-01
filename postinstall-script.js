// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */
'use strict';

const fs = require("fs");

// User's local directory
const userPath = process.env.INIT_CWD

if(__dirname.includes('node_modules')) {
  // Moving files to user's local directory
  fs.cpSync('start', userPath, {
    recursive: true
  });
}
