const sharedConfig = require('release-config')

module.exports = {
  ...sharedConfig,
  tagFormat: `v\${version}`,
}
