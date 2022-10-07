const Log = require('./util/Log'),
  pkg = require('../package.json'),
  LoadConfig = require('./LoadConfig');

const Monitor = require('./monitor/Monitor');

/**
 * @param {Object} options 
 */
module.exports = function noderel(options) {
  const config = LoadConfig(options);

  if (config.verbose) {
    // Print some infos on start process
    Log('yellow', `> [NODEREL]\x1b[0m v${pkg.version}`);
    Log('yellow', `> [NODE]\x1b[0m ${process.version}`);
    Log('yellow', `> [${new Date().toLocaleTimeString()}]\x1b[0m NodeRel Start Running\x1b[33m`);
    Log('yellow', `> [START COMMAND]\x1b[0m ${config.command.join(' ')}`);
    Log('yellow', `> [START WATCHING]\x1b[0m ${config.watch}\n`);
  }

  Monitor.emit('start-spawn-process', config);

  if (config.allowRestart) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', data => {
      const stdin = data.toString().trim().toLowerCase();

      if (stdin === 'rs') {
        Monitor.emit('restart-spawn-process', config);
      }

      if (stdin === 'stop noderel') {
        Monitor.emit('kill-spawn-process', config);
      }
    });
  }
}