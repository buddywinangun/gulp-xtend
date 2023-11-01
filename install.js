// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

const fs = require("fs");

// User's local directory
var userPath = process.env.INIT_CWD

// Moving files to user's local directory
fs.cpSync('start', userPath, {
  recursive: true
});