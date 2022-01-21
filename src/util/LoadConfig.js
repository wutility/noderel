const ResolveEntryFile = require('./ResolveEntryFile');

module.exports = function LoadConfig(config) {
  try {
    return require(process.cwd() + '/noderel.json')
  } catch (error) {
    return {
      entry: ResolveEntryFile(config.entry),
      watch: config.watch || '.',
      ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**',
      wait: config.wait ? parseInt(config.wait, 10) : 100,
      verbose: /true|false/i.test(config.verbose),
      allowRestart: /true|false/i.test(config.allowRestart)
    }
  }
}
