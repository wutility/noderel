const StartProcess = require('./process/StartProcess'),
  KillProcess = require('./process/KillProcess'),
  WatchChanges = require('./monitor/WatchChanges');

const Log = require('./util/Log'),
  ResolveEntryFile = require('./util/ResolveEntryFile');

const pkg = require('../package.json'),
  LoadConfig = require('./util/LoadConfig');

/**
 * @param {Object} cliParams 
 */
module.exports = function noderel(cliParams) {

  const config = LoadConfig(cliParams);
  let spawnProcess = StartProcess(config.entry);

  WatchChanges(config)
    .on('change', () => {
      setTimeout(() => {

        KillProcess(spawnProcess.pid);
        spawnProcess = StartProcess(config.entry);

        Log('cyan', `\n[${new Date().toLocaleTimeString()}] RESTART DUE CHANGES\n`);
      }, config.delay);
    });

  if (config.allowRestart) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', data => {
      const stdin = data.toString().trim().toLowerCase();

      if (stdin === 'rs') {
        KillProcess(spawnProcess.pid);
        spawnProcess = StartProcess(config.entry);
        Log('green', `\n> [${new Date().toLocaleTimeString()}] NODEREL RESTARTING\n`);
      }
    });
  }

  /**
   * SIGINT: CTRL+C
   * SIGQUIT: Keyboard quit
   * SIGTERM: kill command
   */
  ["SIGTERM", "SIGINT", "SIGHUP", "SIGQUIT"].forEach(evt => {
    process.on(evt, (signal) => {
      const localTime = new Date().toLocaleTimeString();
      Log('green', `\n> [SIGNAL ${signal} ${localTime}]\x1b[0m Noderel terminating...`);
      Log('green', ` x [KILL PROCESS ${localTime}]\x1b[0m ID: ${process.pid}`);
      process.removeAllListeners('data');
      setTimeout(() => { process.exit(1); }, 100);
    });
  });

  process.on('exit', () => {
    const localTime = new Date().toLocaleTimeString();
    if (spawnProcess) {
      KillProcess(spawnProcess.pid);
      Log('green', ` x [KILL CHILD PROCESS ${localTime}]\x1b[0m ID: ${spawnProcess.pid}\n`);
    }
  });

  // Print some infos on start process
  Log('cyan', `> [INFO NODEREL]\x1b[0m v${pkg.version}`);
  Log('cyan', `> [INFO NODE]\x1b[0m ${process.version}`);

  Log('yellow', `\n > [${new Date().toLocaleTimeString()}]\x1b[0m NodeRel Start Running\x1b[33m`);

  Log('yellow', `> [START COMMAND]\x1b[0m node ${ResolveEntryFile(config.entry)}`);
  Log('yellow', `> [START WATCHING]\x1b[0m ${config.watch}\n`);
}
