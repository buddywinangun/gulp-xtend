# Gulp Xtend

> Frontend Tooling with [gulp.js](https://gulpjs.com/).

## Table of contents

* [Features](#features)
* [Tools Supported](#tools-supported)
* [Changelog](#changelog)

## Features

Fitur utama meliputi:

- Optimize SVGs.
- Concatenate, and minify JavaScript.
- Compile, minify, and autoprefix Sass.
- Copy static files and folders into your `dist` directory.
- Automatically add headers and project details to JS and CSS files.
- Watch for file changes, and automatically recompile build and reload webpages.
- Can easily develop themes using popular web frameworks like [Bootstrap](https://getbootstrap.com/).
- **Rollup Compiler js** Code splitting, `es/ejs/amd` format, dan js Next-Gen ditangani oleh kompiler **rollup-stream**
- **Project Configuration** tersedia di setiap konfigurasi proyek untuk kebutuhan proyek itu sendiri sebagai pembeda proyek satu dengan yang lain.

**This project has a [Code of Conduct][].**

## Table of contents

* [Release types](#release-types)
  * [Schedule](#schedule)
  * [Phases](#phases)
  * [Plan](#plan)
* [Packages](#packages)
* [Contribution](#contribution)
* [License](#license)

## Release types

### Schedule

| Release | Status          | Initial Release | Active LTS Start | Maintenance LTS Start | End-of-life |
| :-----: | :-------------: | :-------------: | :--------------: | :-------------------: | :---------: |
| [1.x][] | **End-of-life** | 2017-10-19      | -                | 2023-10-22            | 2023-10-29  |
| [2.x][] | **Maintenance** | 2023-10-29      | 2023-10-30       | 2023-11-01            | TBD         |
| [3.x][] | **Active LTS**  | 2023-11-01      | 2023-11-18       | TBD                   | TBD         |
| [4.x][] | **Current**     | 2023-12-26      | TBD              | TBD                   | TBD         |
| 5.x     | **Pending**     | TBD             | TBD              | TBD                   | TBD         |

[1.x]: https://github.com/buddywinangun/gulp-xtend/tree/v1.x
[2.x]: https://github.com/buddywinangun/gulp-xtend/tree/v2.x
[3.x]: https://github.com/buddywinangun/gulp-xtend/tree/v3.x
[4.x]: https://github.com/buddywinangun/gulp-xtend/tree/v4.x

### Phases

Ada tiga fase rilis: 'Current', 'Active Long Term Support (LTS)', and 'Maintenance'.

 * Pre-releases - Branch Pre-release - cth:(beta, alpha), kode tidak stabil yang sedang dalam pengembangan aktif dan mungkin mengandung bug atau perubahan yang dapat menyebabkan gangguan serta masih mengalami modifikasi signifikan. Direkomendasikan untuk tujuan pengujian kode.
 * Current - Kode rilis di branch `master` dengan versi terakhir yang dirilis.
 * Active LTS - Branch versi mayor - cth:(v1.x), dengan fokus pada stabilitas, Fitur baru, perbaikan bug, and keamanan.
 * Maintenance - Branch versi mayor - cth:(v1.x), dengan fokus pada perbaikan bug dan peningkatan keamanan. Terkait fitur baru mungkin ditambahkan jika mendukung migrasi ke rilis selanjutnya.

### Plan

Rilis baru dibuat dari branch `master` ke versi mayor *Active*. Lihat [Releases Phases](#release-phases) untuk rincian perubahan apa yang diharapkan terjadi pada setiap fase rilis.

## Packages

The Gulp Xtend repo is managed as a [monorepo](https://en.wikipedia.org/wiki/Monorepo), which contains Gulp Xtend [packages](https://github.com/buddywinangun/gulp-xtend/tree/main/packages).

| Package                                                     | Version (click for changelogs)                                                     |
| ----------------------------------------------------------- | :----------------------------------------------------------------------------------|
| [gulp-xtend](packages/gulp-xtend)                           | [gulp-xtend version](packages/gulp-xtend/CHANGELOG.md)                             |
| [create-gulp-xtend](packages/create-gulp-xtend)             | [create-gulp-xtend version](packages/create-gulp-xtend/CHANGELOG.md)               |

## Contributing

See [Contributing Guide](.github/CONTRIBUTING.md).

## License

[MIT](LICENSE).

[Code of Conduct]: .github/CODE_OF_CONDUCT.md