const Log = require('./util/Log'),
  ResolveEntryFile = require('./util/ResolveEntryFile'),
  pkg = require('../package.json'),
  LoadConfig = require('./config/LoadConfig');

const Monitor = require('./monitor/Monitor');

/**
 * @param {Object} cliParams 
 */
module.exports = function noderel(cliParams) {
  const config = LoadConfig(cliParams);

  // Print some infos on start process
  Log('yellow', `> [NODEREL]\x1b[0m v${pkg.version}`);
  Log('yellow', `> [NODE]\x1b[0m ${process.version}`);
  Log('yellow', `> [${new Date().toLocaleTimeString()}]\x1b[0m NodeRel Start Running\x1b[33m`);
  Log('yellow', `> [START COMMAND]\x1b[0m node ${ResolveEntryFile(config.entry)}`);
  Log('yellow', `> [START WATCHING]\x1b[0m ${config.watch}\n`);


  Monitor.emit('start-spawn-process', config);

  if (config.allowRestart) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', data => {
      const stdin = data.toString().trim().toLowerCase();

      if (stdin === 'rs') {
        Monitor.emit('restart-spawn-process', config);
      }
    });
  }  
}
