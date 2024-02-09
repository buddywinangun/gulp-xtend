> Blank starter theme for Gulp Xtend.

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Changelog](#changelog)

## Quickstart

1. Add the .npmrc file to include a line specifying GitHub Packages URL and the namespace where the package is hosted, see [docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-packages-from-other-organizations).
```bash
@buddywinangun:registry=https://npm.pkg.github.com
```
2. Create and Navigate to the newly project directory
```bash
npx create-gulp-xtend my-awesome-theme -t @buddywinangun/starter-gulp-xtend
```
3. navigate to the root `my-awesome-theme` directory and run `npm install` to install dependencies.
```bash
npm install
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

## Changelog

See [CHANGELOG](/CHANGELOG.md).
