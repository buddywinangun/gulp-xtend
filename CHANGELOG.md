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

[1.x]: https://github.com/buddywinangun/gulp-xtend/tree/v1.x
[2.x]: https://github.com/buddywinangun/gulp-xtend/tree/v2.x
[3.x]: https://github.com/buddywinangun/gulp-xtend/tree/v3.x
[4.x]: https://github.com/buddywinangun/gulp-xtend/tree/v4.x

## Release Phases

Ada tiga fase rilis: 'Current', 'Active Long Term Support (LTS)', and 'Maintenance'.

 * Current - Kode tidak stabil di branch `master` yang sedang dalam pengembangan aktif dan mungkin mengandung bug atau perubahan yang dapat menyebabkan gangguan serta masih mengalami modifikasi signifikan. Direkomendasikan untuk tujuan pembangunan lokal, dan tidak boleh digunakan dalam produksi.
 * Active LTS - Branch versi mayor - cth:(v1.x), dengan fokus pada stabilitas, Fitur baru, perbaikan bug, and keamanan.
 * Maintenance - Branch versi mayor - cth:(v1.x), dengan fokus pada perbaikan bug dan peningkatan keamanan. Terkait fitur baru mungkin ditambahkan jika mendukung migrasi ke rilis selanjutnya.

## Release plan

Rilis baru dibuat dari branch `master` ke versi mayor *Active*. Lihat [Releases Phases](#release-phases) untuk rincian perubahan apa yang diharapkan terjadi pada setiap fase rilis.