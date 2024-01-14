// -- General

const { src, dest } = require('gulp');
const util = require('util');
const defaultRegistry = require('undertaker-registry');
const fs = require("fs");

// -- Delete

const realFavicon = require('gulp-real-favicon');

// -- Registry

function faviconRegistry(opts) {
  defaultRegistry.call(this);
  this.opts = opts;
}

util.inherits(faviconRegistry, defaultRegistry);

faviconRegistry.prototype.init = function (gulpInst) {
  const opts = this.opts;

  // Generatie real favicon
  gulpInst.task('favicon:generate', (cb) => {
    realFavicon.generateFavicon(
      {
        masterPicture: opts.options.favicon.startImage,
        dest: opts.options.favicon.destination,
        iconsPath: './'+ opts.project.assets.dir + 'icons',
        design: {
            ios: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#ffffff',
              margin: '14%',
              assets: {
                  ios6AndPriorIcons: false,
                  ios7AndLaterIcons: false,
                  precomposedIcons: false,
                  declareOnlyDefaultIcon: true,
              },
            },
            desktopBrowser: {
                design: 'raw',
            },
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false,
                    },
                },
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: opts.project.options.androidThemeColor,
                manifest: {
                    name: opts.project.title,
                    startUrl: '/',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true,
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: true,
                },
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#5bbad5',
            },
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: true,
            readmeFile: false,
            htmlCodeFile: true,
            usePathAsIs: false,
        },
        markupFile: opts.options.favicon.dataFile,
      },
      () => {
        cb();
      }
    )
  });

  // Inject the favicon markup in all your HTML pages
  gulpInst.task('favicon:inject', () => {
    return src(opts.options.favicon.inject.files)
      .pipe(realFavicon.injectFaviconMarkups(
        JSON.parse(
          fs.readFileSync(opts.options.favicon.dataFile)
        ).favicon.html_code
      ))
      .pipe(dest(opts.options.favicon.inject.destination));
  });
};

exports.registry = faviconRegistry;