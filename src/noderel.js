const ProcessUtil = require('./lib/ProcessUtil')
const loadFile = require('./lib/loadFile')

module.exports = async function noderel (config) {

  const cfg = {
    entry: loadFile(config.entry),
    watch: config.watch || '.',
    ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**'
  }

  ProcessUtil.watchAndReload(cfg.entry, cfg.watch)
}
