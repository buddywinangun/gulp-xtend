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

  template: (data) => {
    let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
    return {
      src: data.dir + dirVersion + SOURCE,
      build: data.dir + dirVersion + BUILD
    }
  },

  sass: (data) => {
    let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
    return {
      src: data.dir + dirVersion + SOURCE + 'sass',
      build: data.dir + dirVersion + BUILD + 'assets/css'
    }
  },

  script: (data) => {
    let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
    return {
      src: {
        dir: data.dir + dirVersion + SOURCE + 'js',
        filename: 'index.js'
      },
      build: {
        dir: data.dir + dirVersion + BUILD + 'assets/js',
        filename: 'script.js'
      }
    }
  },

  svgs: (data) => {
    let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
    return {
      src: data.dir + dirVersion + SOURCE + 'svg/**/*.svg',
      build: data.dir + dirVersion + BUILD + 'assets/svg'
    }
  },

  static: (data) => {
    let dirVersion = (data.version.input == '' ? '/' : data.version.input + '/');
    return {
      src: data.dir + dirVersion + SOURCE + 'static/**/*',
      build: data.dir + dirVersion + BUILD + 'assets/'
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