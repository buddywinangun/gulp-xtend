# Bugs, Questions, and Feature Requests

Laporan bug, pertanyaan, dan permintaan fitur gunakan [GitHub Issues](/issues).

**Sebelum memposting, lakukan penelusuran untuk memastikan issue atau pertanyaan anda belum dilaporkan atau didiskusikan.** Jika tidak ada issue yang cocok, silakan buat issue tersebut.

**Pastikan untuk mengikuti arahan berikut:**

1. Judul yang jelas dan deskriptif (misalnya, "Bug" bukanlah judul yang bagus).
2. Sertakan file minimum yang diperlukan untuk menunjukkan bug.
3. Browser dan OS yang anda gunakan.

## Get started

To begin, please fork the project, clone your fork, configure the remotes, and install dependencies:

```bash
# 1. Fork the project

# 2. Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/gulp-project.git

# 3. Navigate to the newly cloned directory
$ cd gulp-project

# 4. Assign the original repo to a remote called "upstream"
$ git remote add upstream https://github.com/buddywinangun/gulp-project.git

# 5. Install dependencies
npm install
```

## Pull requests

1. Read [get started](#get-started) above.

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

7. Open a Pull Request with a clear title and description against the `main` branch.
