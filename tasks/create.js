/**
 * create.js
 *
 * The gulp task runner file.
 */

// -- General

const gulp = require('gulp');
const msg = require("gulp-msg");
const directoryExists = require("directory-exists");

// -- Config

const config = require('./config');

// ---------------------------------------------------
// -- GULP TASKS
// ---------------------------------------------------

gulp.task('create', done => {

  const nameProject = config.project && config.project.length > 0 ? config.project : '';
  const directory = config.paths.projects + nameProject;

  // -- Create Project Starter kit

  const createStarterProject = dirPath => {
    return gulp.src(config.paths.start + '**/*')
      .pipe(gulp.dest(dirPath));
  };

  // -- Validation of name project

  const validateName = dirName => {
    let regx = /^[a-z0-9_-]{3,20}$/;
    let result = regx.test(dirName);

    return result;
  };

  // -- Running of create project

  if (validateName(nameProject)) {
    directoryExists(directory).then(result => {
      if (!result) {

        // -- Project create starter

        createStarterProject(directory);

        // -- Message notice

        msg.Info('~', 'CREATE OF PROJECT TEMPLATES', '~');
        msg.Success('Status           : <%= status %>, Project has been created.', {
          status: 'Success!'
        });
        msg.Warning('Name Project     : <%= name %>', {
          name: nameProject
        });
        msg.Warning('Project dir.     : <%= dir %>', {
          dir: directory
        });
        msg.Note('');
        msg.Info('~', '(c) ' + new Date().getFullYear() + ' gulp project', '~');

      } else {

        // -- Message notice

        msg.Info('~', 'CREATE OF PROJECT TEMPLATES', '~');
        msg.Error('Status        : <%= status %>, Project is Existing.', {
          status: 'FAILED!'
        });
        msg.Note('Name Project  : <%= name %>', {
          name: nameProject
        });
        msg.Note('');
        msg.Info('~', '(c) ' + new Date().getFullYear() + ' gulp project', '~');
      }
    });
  } else {

    // -- Message notice

    msg.Info('~', 'CREATE OF PROJECT TEMPLATES', '~');
    msg.Error("Status: <%= status %>", {
      status: 'ERROR!'
    });
    msg.Note('');
    msg.Note('~', 'GUIDELINE', '~');
    msg.Warning('- gulp create --project [project-name]');
    msg.Warning('- Project name cannot be empty');
    msg.Warning('- Project name must be at least 3 characters long');
    msg.Warning('- project names are recommended not to use spaces and special characters (! @ # $ % ^ & * () " ; : < > , ? /) ');
    msg.Note('');
    msg.Info('~', '(c) ' + new Date().getFullYear() + ' gulp project', '~');
  }

  done();
});