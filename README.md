## About Gulp Project

**Gulp Project** adalah alat yang kami rancang menggunakan [gulp.js](https://gulpjs.com/) dan fleksibilitas JavaScript sebagai prototipe template HTML5 multi-project yang bertujuan untuk memudahkan pengembang front-end dalam membangun antarmuka pengguna yang dituangkan dalam bentuk visual web dari desain yang telah ditentukan dengan arsitektur yang baik.

## Features

Fitur utama meliputi:

- Create Project
- Auto-organized static assets like img, font and other file types.
- Can easily develop themes using popular web frameworks like [Bootstrap](https://getbootstrap.com/), [Tailwind CSS](https://tailwindcss.com/).
- **Project Configuration** tersedia di setiap konfigurasi proyek untuk kebutuhan proyek itu sendiri sebagai pembeda proyek satu dengan yang lain.
- **Minifies** and **optimize** your css.
- **Webpack Compiler js** Code splitting, `es/ejs/amd` format, dan js Next-Gen ditangani oleh kompiler **webpack-stream**

## Tools Supported

Alat pendukung yang tersedia untuk membangun proyek yang luar biasa.

- [**GULP 4**](https://gulpjs.com/) Otomatiskan dan tingkatkan alur kerja Anda.
- [**Nunjucks**](https://mozilla.github.io/nunjucks/) templating yang kaya dan kuat untuk JavaScript.
- [**Browsersync**](https://browsersync.io/) dengan memuat ulang langsung.
- [**Sass**](http://sass-lang.com/) CSS pre-processor dengan [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [**Webpack**](https://webpack.js.org/) Bundel modul untuk JavaScript
- [**ES2015 Babel**](https://babeljs.io/) Transpiler yang memungkinkan Anda menulis Kode JS dengan gaya ES2015/ES6.

## Release

Lihat [Release schedule](/CHANGELOG.md#release-schedule) untuk jadwal rilis terbaru. Dan daftar riwayat dapat ditemukan di [CHANGELOG](/CHANGELOG.md#changelog).

## Requirements

- **[Node.js](https://nodejs.org/en/)** Versi node yang dibutuhkan adalah >= `10.0`
- **[npm](https://www.npmjs.com/)** Version  `6.0.*`

> Jika Anda sebelumnya telah menginstal gulp secara global, jalankan `npm rm --global gulp` sebelum mengikuti petunjuk berikut.

## Installation

1. Clone Repo.
```sh
git clone https://github.com/buddywinangun/gulp-project.git
```

2. Gulp CLI Setup.
```sh
npm install --global gulp-cli
```

3. Install dependencies
```sh
npm install
```

## Usage

- Create Project

Saat memulai proyek baru di **Gulp Project**, ada parameter penting yang perlu diingat dalam perintah skrip yang sedang berjalan yang akan dapat dieksekusi yaitu `--project`. di bawah ini adalah contoh perintah skrip yang sedang berjalan untuk membuat proyek baru.
```sh
gulp create --project [project-name]
```

> Ada beberapa hal yang perlu diperhatikan dalam pemberian nama proyek, antara lain:
> - Nama proyek tidak boleh kosong
> - Nama proyek minimal harus 3 karakter
> - nama proyek disarankan tidak menggunakan `spasi` ataupun karakter khusus `(! @ # $ % ^ & * () " ; : < > , ? /)`

- Serve or watch Project

Saat kita memulai proses `serve`, task runner ini menggunakan `env` **development** dan secara otomatis `melihat` perubahan yang Anda buat pada kode.
```sh
gulp serve --project [project-name]
```
```sh
gulp watch --project [project-name]
```

- Development Build Project
```sh
gulp --project [project-name]
```

- Production Build Project
```sh
gulp --project [project-name] --prod
```

## Contributing

Panduan kontribusi dapat ditemukan di [CONTRIBUTING](.github/CONTRIBUTING.md).

## License

Gulp Project dilisensikan di bawah [MIT license](/LICENSE.md).
