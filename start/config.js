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
  // Header Template | Append of header in script js or css
  //

  header: {
    main: ['/**',
      ' * <%= package.title %> v<%= package.version %> <%= "("+package.homepage+")" %>',
      ' * Copyright ' + (new Date()).getFullYear() + ' <%= package.author.name %>',
      ' * Licensed under <%= package.license %>',
      ' */',
      ''
    ].join('\n')
  },

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
  }
};