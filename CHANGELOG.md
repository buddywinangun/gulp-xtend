# Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.

## Release schedule

| Release | Status          | Initial Release | Active LTS Start | Maintenance LTS Start | End-of-life |
| :-----: | :-------------: | :-------------: | :--------------: | :-------------------: | :---------: |
| [1.x][] | **End-of-life** | 2017-10-19      | -                | 2023-10-22            | 2023-10-29  |
| [2.x][] | **Maintenance** | 2023-10-29      | 2023-10-30       | 2023-11-01            | TBD         |
| [3.x][] | **Active LTS**  | 2023-11-01      | 2023-11-18       | TBD                   | TBD         |
| [4.x][] | **Current**     | 2023-12-26      | TBD              | TBD                   | TBD         |
| 5.x     | **Pending**     | TBD             | TBD              | TBD                   | TBD         |

[1.x]: https://github.com/buddywinangun/gulp-xtend/tree/1.0.0
[2.x]: https://github.com/buddywinangun/gulp-xtend/tree/2.0.0
[3.x]: https://github.com/buddywinangun/gulp-xtend/tree/3.0.0
[4.x]: https://github.com/buddywinangun/gulp-xtend/tree/4.0.0

## Release Phases

Ada tiga fase rilis: 'Current', 'Active Long Term Support (LTS)', and 'Maintenance'.

 * Current - Kode tidak stabil di branch `master` yang sedang dalam pengembangan aktif dan mungkin mengandung bug atau perubahan yang dapat menyebabkan gangguan serta masih mengalami modifikasi signifikan. Direkomendasikan untuk tujuan pembangunan lokal, dan tidak boleh digunakan dalam produksi.
 * Active LTS - Branch versi mayor - cth:(v1.x), dengan fokus pada stabilitas, Fitur baru, perbaikan bug, and keamanan.
 * Maintenance - Branch versi mayor - cth:(v1.x), dengan fokus pada perbaikan bug dan peningkatan keamanan. Terkait fitur baru mungkin ditambahkan jika mendukung migrasi ke rilis selanjutnya.

## Release plan

Rilis baru dibuat dari branch `master` ke versi mayor *Active*. Lihat [Releases Phases](#release-phases) untuk rincian perubahan apa yang diharapkan terjadi pada setiap fase rilis.

Format didasarkan pada [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan menggunakan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/buddywinangun/gulp-xtend/compare/5.0.0...HEAD)

## [Release Changelog](https://github.com/buddywinangun/gulp-xtend/releases)

## [4.0.0] - 2023-12-26

### Fixed

- Bug postinstall script
- Bug bin.js

### Changed

- gulpfile.js
- readme.md
- files config on package.json
- main config on package.json
- description config on package.json
- scripts postinstall on package.json
- Upgrade dependencies postcss
- Upgrade dependencies @babel/preset-env
- Upgrade dependencies @babel/core
- Upgrade task clean
- Upgrade task sass
- Upgrade task script
- Upgrade task static
- Upgrade task template
- Upgrade boileplate start

### Added

- lib alert
- task copy
- task favicon
- gulp.config.js file
- Dependencies twig templating
- Dependencies stylelint
- Dependencies gulp-yaml
- Dependencies gulp-util
- Dependencies gulp-uglify
- Dependencies gulp-stylelint
- Dependencies gulp-minify-html
- Dependencies gulp-load-plugins
- Dependencies gulp-imagemin
- Dependencies gulp-eslint
- Dependencies gulp-csso
- Dependencies real-favicon
- Dependencies pixrem

### Removed

- lib template
- task svgs
- task syncs
- config.js file
- Dependencies gulp4-run-sequence
- Dependencies gulp-sourcemaps
- Dependencies jsbeautifier
- Dependencies cssnano
- Dependencies rollup
- Dependencies rollup-plugin-glob-import
- Dependencies rollup-plugin-node-globals