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
npx @buddywinangun/create-gulp-xtend
```
4. Run the compiler
```bash
npm start
```

## Usage

Our [package.json](./package.json) includes the following commands for develop the project:

| Command | Description |
| ------- | ----------- |
| `npm start` | Development Build Project. |
| `npm run watch` | Watches the source files and automatically building them whenever you save. |
| `npm run build` | Build the theme. |

You may need to run specific command, please see our [package.json](./package.json) or run `npm run` to see all the npm scripts.

## License

[MIT license](/LICENSE.md).
