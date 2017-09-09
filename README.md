## About Gulp Project

**Gulp Project** adalah alat yang kami rancang menggunakan [gulp.js](https://gulpjs.com/) dan fleksibilitas JavaScript sebagai prototipe template HTML5 multi-project yang bertujuan untuk memudahkan pengembang front-end dalam membangun antarmuka pengguna yang dituangkan dalam bentuk visual web dari desain yang telah ditentukan dengan arsitektur yang baik.

## Features

Fitur utama meliputi:

- Create Project

## Tools Supported

Alat pendukung yang tersedia untuk membangun proyek yang luar biasa.

- [**GULP 4**](https://gulpjs.com/) Otomatiskan dan tingkatkan alur kerja Anda.

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

## Contributing

Panduan kontribusi dapat ditemukan di [CONTRIBUTING](.github/CONTRIBUTING.md).

## License

Gulp Project dilisensikan di bawah [MIT license](/LICENSE.md).
