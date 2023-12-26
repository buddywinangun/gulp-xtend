/**
 * config.js
 *
 * The project configuration file.
 *
 */

module.exports = {
  options: {
    sass: true,
    sass_lint: true,
    script: true,
    script_lint: true,
    copy: true,
    static: true,
    favicon: true,
    template: true,
    lang: 'en', // Language Direction e.g. en, ar
    androidThemeColor: '#ffffff', // Theme color for Android app
    fileTypes: "jpg|png|svg|mp4|webm|ogv|json", //Files types that will be copied to the ./build/* folder
  },
  configFile: {
    eslint: './.eslintrc.js',
    stylelint: './.stylelintrc.js',
    data: './data.json'
  },
  template: {
    templating: 'twig', // templating use
    data: {
      dir: './src/data',
    },
    src: {
      dir: './src/template',
    },
    build: {
      dir: './dist',
      extname: '.html'
    }
  },
  assets: {
    dir: 'assets/',
    src: {
      dir: './src',
    },
    build: {
      dir: './dist',
    }
  },

  //
  // Banner Template | Append of banner in script js or css
  //
  banner: ['/**',
    ' * <%= data.title %> v<%= data.version %> <%= "("+data.homepage+")" %>',
    ' * Copyright ' + (new Date()).getFullYear() + ' <%= data.author.name %>',
    ' * Licensed under <%= data.license %>',
    ' */',
    ''
  ].join('\n'),

  //
  // Skip CSS & JavaScript files from bundle files (e.g. vendor.min.css)
  //
  skipFilesFromBundle: [],

  //
  // Copy/Paste files and folders into different path
  //
  copyDependencies: {},
};