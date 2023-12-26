/**
 * gulp.config.js
 *
 * The gulp configuration file.
 */

const cli = require('./lib/cli');

const utils = {
  deleteLine: "builder:delete",
  isProd: cli.production === true,
};

//
// Get of configuration project
//
const project = {
  dir: cli.cwd,
  ...require(cli.cwd + '/config'),
  ...require(cli.cwd + '/package.json')
};

//
// path config | setup of path src or dist file
//
const paths = {
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

//
// Options
//
const options = {

  // ----- Banner ----- //
  banner: {
    text: project.banner,
    data: require(cli.cwd + '/package.json')
  },

  // ----- Clean ----- //
  clean: {
    dist: {
      files: [
        project.assets.build.dir + '/**/*',
        project.template.data.dir + '/data.yml'
      ],
      message: 'Delete destination folder'
    }
  },

  // ----- Template ----- //
  template: {
    tasks: ['template:data', 'template:compile', 'template:extract'],
    files: [
      project.template.src.dir + '/**/*.html',
      '!' + project.template.src.dir + '/**/_*.html'
    ],
    watch: [project.template.src.dir + '/**/*.html'],
    destination: project.template.build.dir,
    extname: project.template.build.extname,
    data: project.configFile.data,
    min_args: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      minifyJS: true, // minify inline JavaScript
      minifyCSS: true, // minify inline CSS
      conditionals: true,
      empty: true
    },
    json: {
      files: [
        project.template.data.dir + '/*.yml',
        project.template.src.dir + '/**/*.yml',
        '!' + project.template.data.dir + '/data.yml'
      ],
      file: 'data.yml',
      destination: project.template.data.dir
    },
  },

  // ----- SASS ----- //
  sass: {
    message: 'Compiling Scss',
    tasks: ['sass:lint', 'sass:compile', 'sass:vendor'],
    files: [
      project.assets.src.dir + '/scss/' + '**/*.scss',
      project.template.src.dir + '/**/*.scss'
    ],
    destination: project.assets.build.dir + '/' + project.assets.dir + 'css',
    sass_args: {
      sourceComments: 'map',
      outputStyle: 'expanded',
      charset: true,
      importer: [
        require('node-sass-package-importer')(),
        require('node-sass-glob-importer')()
      ],
      // fiber: require('fibers'),
      imagePath: project.assets.src.dir + '/' + project.assets.dir + 'images'
    },
    // combineMq_args : { beautify: true },
    autoprefixer_args: {
      cascade: true
    },
    min_args: {
      level: 1,
      format: {
        breakWith: 'lf'
      }
    }
  },

  // ----- Javascripts ----- //
  script: {
    tasks: ['script:lint', 'script:compile', 'script:vendor'],
    files: project.assets.src.dir + '/js',
    destination: project.assets.build.dir + '/' + project.assets.dir + 'js',
    babel_args: {
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            bugfixes: true,
            modules: false
          }
        ]
      ],
      babelHelpers: 'bundled',
      compact: true,
      exclude: 'node_modules/**'
    },
    resolve_args : {
      browser: true
    },
    min_args: {
      mangle: true,
      compress: {
        typeofs: false
      },
      format: {
        comments: /^!/i
      },
      sourceMap: false
    }
  },

  // ----- Static ----- //
  static: {
    files: project.assets.src.dir + '/static',
    watch: project.assets.src.dir + '/static/' + '**/*',
    destination: project.assets.build.dir + '/assets',
    tasks: ['copy:fonts', 'min:image'],
  },

  // ----- Favicon ----- //
  favicon: {
    tasks: ['favicon:generate', 'favicon:inject'],
    startImage: project.assets.src.dir + '/favicon.png', // Original image (min 512*521 px) to start from
    destination: project.assets.build.dir + '/' + project.assets.dir + 'icons', // Save generated icons and config files inside this folder
    dataFile: project.assets.build.dir + '/' + project.assets.dir + 'icons/faviconData.json',
    inject: {
      files: [project.assets.build.dir + '/**/*.html'],
      destination: project.assets.build.dir, // Save generated icons and config files inside this folder
    }
  },

  // ----- Copy ----- //
  copy: {
    tasks: ['copy:dependencies', 'copy:skippedNodeFiles', 'copy:skippedFiles'],
    destination: project.assets.build.dir + '/' + project.assets.dir + 'vendor'
  },

  // ----- Browser Sync ----- //
  browsersync: {
    args: {
      server: {
        baseDir: project.assets.build.dir
      },
      options: {
        reloadDelay: 250
      },
      port: cli.port ? Number(cli.port) : 9000,
      notify: false
    }
  },

  // ----- Watch ----- //
  watch: {
    tasks: [],
    files: function () {
      return [
        options.sass.files,
        options.script.files,
        options.template.json.files,
        options.template.watch,
        options.static.watch,
      ]
    },
    run: function () {
      return [
        options.sass.tasks,
        options.script.tasks,
        options.template.tasks,
        options.template.tasks.concat(['copy:skippedNodeFiles', 'copy:skippedFiles']),
        options.static.tasks,
      ]
    }
  }
}

module.exports = {
  options,
  project,
  utils,
  paths,
};