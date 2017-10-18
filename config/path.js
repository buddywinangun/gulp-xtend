/**
 * path.js
 *
 * The gulp path file.
 */

const BUILD = 'build/';
const SOURCE = 'src/';
const START = 'start/';
const PROJECTS = './projects/';

module.exports = {

  //
  // path | setup of path src or dist file
  //

  start: START,

  projects: PROJECTS,

  template: {
    input: (data) => {
      let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
      let path = data.dir + dirVersion + SOURCE + 'template/pages/**/*.html';
      return path;
    },
    output: (data) => {
      let dirVersion = (data.version.output == '' ? '/' : data.version.output + '/');
      let path = data.dir + dirVersion + BUILD;
      return path;
    },
    templates: (data) => {
      let dirVersion = (data.version.output == '' ? '/' : data.version.output + '/');
      let path = data.dir + dirVersion + SOURCE + 'template/';
      return path;
    }
  },

  static: {
    input: (data) => {
      let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
      let path = data.dir + dirVersion + SOURCE + 'static/**/*';
      return path;
    },
    output: (data) => {
      let dirVersion = (data.version.output == '' ? '/' : data.version.output + '/');
      let path = data.dir + dirVersion + BUILD + 'assets/';
      return path;
    }
  },

  build: (data) => {
    let dirVersion = (data.version.output == '' ? '/' : data.version.output + '/');
    let path = data.dir + dirVersion + BUILD;
    return path;
  },

  watch: (data) => {
    let dirVersion = (data.version.output == '' ? '/' : data.version.output + '/');
    let path = data.dir + dirVersion + SOURCE;
    return path;
  },

  level: (file) => {
    relativePathLevels = file.relative.split(/\/|\\/).length - 1;

    let level = '';

    if (relativePathLevels) {
      for (let i = 0; i < relativePathLevels; i++) {
        if (relativePathLevels === i + 1) {
          level = level + '..'
        } else {
          level = level + '../'
        }
      }
    } else {
      level = '.'
    }

    return level;
  }
};