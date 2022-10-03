const ResolveEntryFile = require('../util/ResolveEntryFile');

/**
 * @param {Object} config 
 * @returns Object
 */
module.exports = function LoadConfig(config) {
  try {
    return require(process.cwd() + '/noderel.json')
  } catch (error) {
    return {
      entry: ResolveEntryFile(config.entry),
      watch: config.watch || '.',
      ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**',
      delay: config.delay ? parseInt(config.delay, 10) : 100,      
      verbose: config.verbose ? JSON.parse(config.verbose) : true,
      allowRestart: config.allowRestart ? JSON.parse(config.allowRestart) : true
    }
  }
}