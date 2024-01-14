#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const chalk = require('chalk');
const npmLatestVersion = require('latest-version');
const download = require('./lib/download');

yargs
  .scriptName(`npx create-gulp-xtend`)
  .usage('')
  .usage(`Usage: $0 ${chalk.cyan('<project-directory>')} [options]`)
  .demandCommand(
    1, 1,
    `Please specify the project directory.`,
    `Project directory can't contain spaces.`
  )
  .check((argv) => {
    const projectPath = path.resolve(argv._[0]);

    if (fs.existsSync(projectPath)) {
      console.log();
      console.error(chalk.red(`The ${chalk.cyan(projectPath)} already exists.`));
      console.log();
      console.log(chalk.red(`Please choose a different name or path.`));
      yargs.showHelp();
      process.exit(1);
    }

    return true;
  })
  .fail(function (msg, err, yargs) {
    if (err) throw err;
    console.log();
    console.error(chalk.red(msg));
    yargs.showHelp();
    process.exit(1);
  })
  .options({
    't': {
      alias: 'template',
      type: 'string',
      describe: `Set starter template`,
      demandOption: true
    }
  })
  .wrap(null)
  .help('help')
  .alias('h', 'help')
  .describe('help', `Show help`)
  .version()
  .alias('v', 'version')
  .describe('version', `Show version number`);

const argv = yargs.argv;

(async () => {
  const args = {
    projectName: path.basename(argv._[0]),
    projectPath: path.resolve(argv._[0]),
    argv: argv
  };
  let uri = '';

  // `<@scope>/<name>` or `<@scope>/<name>@<version>`
  let isScope = argv.template.includes('/');
  let isScopeHasVersion = isScope ? argv.template.split('/')[1].includes('@') : false;
  let scopeOrg = isScope ? argv.template.split('/')[0] : '';
  let scopePkgName = isScope ? argv.template.split('/')[1].split('@')[0] : '';
  let scopePkgVersion = isScope && isScopeHasVersion ? argv.template.split('/')[1].split('@')[1] : '';
  let scopePkgVersionLatest = isScope ? await npmLatestVersion(scopeOrg + '/' +scopePkgName) : '';
  let scopePkgVersionLatestX = isScope ? await npmLatestVersion(scopeOrg + '/' +scopePkgName, { version: scopePkgVersion }) : '';
  scopePkgVersion = scopePkgVersion === '' ? scopePkgVersionLatest : scopePkgVersionLatestX;

  // `<name>` or `<name>@<version>`
  let hasVersion = !isScope ? argv.template.includes('@') : false;
  let pkgName = !isScope ? argv.template.split('@')[0] : '';
  let pkgVersion = !isScope && hasVersion ? argv.template.split('@')[1] : '';
  let pkgVersionLatest = !isScope ? await npmLatestVersion(pkgName) : '';
  let pkgVersionLatestX = !isScope ? await npmLatestVersion(pkgName, { version: pkgVersion }) : '';
  pkgVersion = pkgVersion === '' ? pkgVersionLatest : pkgVersionLatestX;

  if (isScope) {
    uri = `https://registry.npmjs.org/${scopeOrg}/${scopePkgName}/-/${scopePkgName}-${scopePkgVersion}.tgz`;
  }
  if (!isScope) {
    uri = `https://registry.npmjs.org/${pkgName}/-/${pkgName}-${pkgVersion}.tgz`;
  }

  download(uri, argv._[0], args);
})();