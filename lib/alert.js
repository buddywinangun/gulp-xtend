const notify = require("gulp-notify");
const gutil = require("gulp-util");

const log = (message) => {
  gutil.log(message);
}

const error = (err) => {
  let errorMessage = gutil.colors.red('Error compiling. '+ err ?? err.message +' ');

  notify.onError({
    title: 'You have an error!',
    message: 'Please, check your terminal.',
    sound: 'Sosumi'
  })(err);
  log(errorMessage, 'fuck');
  // this.emit('end');
}

module.exports = {
  error,
  log
}