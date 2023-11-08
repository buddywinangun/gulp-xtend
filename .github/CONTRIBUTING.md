# Contributing to Gulp Xtend

Looking to contribute something to Gulp Xtend? **Here's how you can help.**

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Code guidelines
## Using the issue tracker
## Issues assignment
## Issues and labels
## Bug reports
## Feature requests

Laporan bug, pertanyaan, dan permintaan fitur gunakan [GitHub Issues](/issues).

**Sebelum memposting, lakukan penelusuran untuk memastikan issue atau pertanyaan anda belum dilaporkan atau didiskusikan.** Jika tidak ada issue yang cocok, silakan buat issue tersebut.

**Pastikan untuk mengikuti arahan berikut:**

1. Judul yang jelas dan deskriptif (misalnya, "Bug" bukanlah judul yang bagus).
2. Sertakan file minimum yang diperlukan untuk menunjukkan bug.
3. Browser dan OS yang anda gunakan.

## Pull requests

To begin, please fork the project, clone your fork, configure the remotes, and install dependencies:

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork, and configure the remotes:

```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/gulp-xtend.git
# Navigate to the newly cloned directory
cd gulp-xtend
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/buddywinangun/gulp-xtend.git
# Install dependencies
npm install
```

2. If you cloned a while ago, get the latest changes from upstream:
```bash
git checkout main
git pull upstream main
```

3. Create a new topic branch to contain your feature, change, or fix:
```bash
git checkout -b <topic-branch-name>
```

4. Commit your changes.

5. Push your topic branch up to your fork:
```bash
git push origin <topic-branch-name>
```

6. [Open a Pull Request](https://help.github.com/articles/about-pull-requests/) with a clear title and description against the `main` branch.

## License

By contributing your code, you agree to license your contribution under the [MIT License](../LICENSE).