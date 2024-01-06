## About Gulp Xtend

**Gulp Xtend** adalah alat yang kami rancang sebagai prototipe template HTML5 multi-project yang bertujuan untuk memudahkan pengembang front-end dalam membangun antarmuka pengguna yang dituangkan dalam bentuk visual web dari desain yang telah ditentukan dengan arsitektur yang baik menggunakan [gulp.js](https://gulpjs.com/) dan fleksibilitas JavaScript.

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

## Tools Supported

Alat pendukung yang tersedia untuk membangun proyek yang luar biasa.

- [**GULP 4**](https://gulpjs.com/) Otomatiskan dan tingkatkan alur kerja Anda.
- [**Twig**](https://twig.symfony.com/) Mesin template modern.
- [**Browsersync**](https://browsersync.io/) dengan memuat ulang langsung.
- [**Sass**](http://sass-lang.com/) CSS pre-processor dengan [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [**Rollupjs**](https://rollupjs.org/) Bundel modul untuk JavaScript
- [**ES2015 Babel**](https://babeljs.io/) Transpiler yang memungkinkan Anda menulis Kode JS dengan gaya ES2015/ES6.

## Release

Lihat [Release schedule](/CHANGELOG.md#release-schedule) untuk jadwal rilis terbaru. Dan daftar riwayat dapat ditemukan di [CHANGELOG](/CHANGELOG.md#changelog).

## Requirements

- **[Node.js](https://nodejs.org/en/)** Versi node yang dibutuhkan adalah >= `20.8`
- **[npm](https://www.npmjs.com/)** Version  `7.20.*`

> Jika sebelumnya Anda telah menginstal gulp secara global, jalankan `npm rm --global gulp` sebelum mengikuti petunjuk berikut.

## Quickstart

1. Create and Navigate to the newly project directory
```bash
mkdir my_directory; cd my_directory
```
2. Add the .npmrc file to include a line specifying GitHub Packages URL and the namespace where the package is hosted.
```bash
@buddywinangun:registry=https://npm.pkg.github.com
```
3. Install Gulp dependencies
```bash
npm install @buddywinangun/gulp-xtend
```
4. Run the compiler
```bash
npm start
```

## Contributing

Panduan kontribusi dapat ditemukan di [CONTRIBUTING](.github/CONTRIBUTING.md).

## License

Gulp Xtend dilisensikan di bawah [MIT license](/LICENSE.md).
