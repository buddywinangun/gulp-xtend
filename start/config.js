/**
 * project.config.js
 *
 * The project configuration file.
 *
 */

module.exports = {

  //
  // config for templating use
  //

  templating: 'nunjucks',

  //
  // Layout builder to customize look and feel of siderbar and navbar
  //

  layoutBuilder: {
    config: false,
    extend: {
      switcherSupport: true, // ture, false to add/remove dark mode switcher with dependency files
    },
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
  // Language Direction
  //

  languageDirection: {
    lang: 'en' // e.g. en, ar
  },

  //
  // Skip CSS & JavaScript files from bundle files (e.g. vendor.min.css)
  //

  skipFilesFromBundle: [],

  //
  // Copy/Paste files and folders into different path
  //

  copyDependencies: {},

  //
  // Files types that will be copied to the ./build/* folder
  //

  fileTypes: "jpg|png|svg|mp4|webm|ogv|json",

  //
  // Theme Appearance
  //

  appearance: {
    font: "font",
    cover: "cover-image",
    color: "#fff",
  },

  //
  // version of source and dist. for name directory
  //

  version: {
    input: "",
    output: "",
  },

  //
  // Validate Path
  //

  paths: {
    build: 'dist/',
    source: 'src/',
    assets: 'assets/',
  }
};