const fs = require('fs'),
  path = require('path');

/**
 * @param {String} entryFile 
 * @returns {String} entryFilePath
 */
function ResolveEntryFile(entryFile) {
  try {
    if (entryFile) {
      return path.relative(process.cwd(), entryFile);
    }
    else {
      return JSON.parse(fs.readFileSync(path.relative(process.cwd(), 'package.json'), 'utf8')).main
    }
  } catch (err) {
    console.log('Process Failed: Entry file not found', err.message);
    process.exit(1)
  }
}

/**
 * @param {Object} options 
 * @returns Object
 */
module.exports = function LoadConfig(options) {

  let config = { ...options, command: ['node', options.entry] };

  if (options.override) {
    config.command = options.override.trim().split(/\s+/);
    if (config.command.length === 1) config.command[1] = options.entry;
  }

  try {
    return require(process.cwd() + '/noderel.json');
  } catch (error) {
    return {
      entry: ResolveEntryFile(config.entry),
      watch: config.watch || '.',
      ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**',
      delay: config.delay ? parseInt(config.delay, 10) : 100,
      verbose: config.verbose ? JSON.parse(config.verbose) : true,
      command: config.command,
      allowRestart: config.allowRestart ? JSON.parse(config.allowRestart) : true
    }
  }
}