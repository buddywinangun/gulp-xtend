/**
 * path.js
 *
 * The gulp path file.
 */

const notify = require("gulp-notify");

// -- ErrorHandler

const errorHandler = err => {
  notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString(),
    sound: "Beep"
  })(err);
};

module.exports = {
  errorHandler,
};