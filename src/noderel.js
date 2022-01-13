const StartProcess = require('./util/StartProcess');
const KillProcess = require('./util/KillProcess');
const WatchProcess = require('./util/WatchProcess');

const Log = require('./util/Log');
const ResolveFilePath = require('./util/ResolveFilePath');

const pkg = require('../package.json');

module.exports = async function noderel(config) {

  const cfg = {
    entry: ResolveFilePath(config.entry),
    watch: config.watch || '.',
    ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**',
    wait: config.wait ? parseInt(config.wait, 10) : 100,
    allowRestart: config.allowRestart ? JSON.parse(config.allowRestart) : false
  };

  let childProcess = StartProcess(config.entry);

  WatchProcess(cfg)
    .on('change', () => {
      setTimeout(async () => {

        childProcess.kill();
        await KillProcess(childProcess.pid);
        childProcess = StartProcess(config.entry);

        Log('cyan', `\n[${new Date().toLocaleTimeString()}] RESTART DUE CHANGES\n`);
      }, config.wait);
    });

  if (config.allowRestart) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', async data => {
      const stdin = data.toString().trim().toLowerCase();
      if (stdin === 'rs') {
        childProcess.kill();
        await KillProcess(childProcess.pid);
        childProcess = StartProcess(config.entry);
        Log('green', `\n>[${new Date().toLocaleTimeString()}] NODEREL RESTARTING\n`);
      }
    });
  }

  /**
   * SIGINT: CTRL+C
   * SIGQUIT: Keyboard quit
   * SIGTERM: kill command
   */
  ['SIGQUIT', 'SIGINT', 'SIGTERM', 'exit', 'message'].forEach(evt => {
    process.on(evt, async (signal) => {
      Log('red', `\n> [SIGNAL: ${signal}] ${evt}: ${new Date().toLocaleTimeString()}`);
      Log('magenta', `X [Killed PROCESS ID] ${process.pid}`);
      Log('magenta', `X [Killed PROCESS ID] ${childProcess.pid}\n`);

      process.removeAllListeners('data');

      childProcess.kill();
      await KillProcess(childProcess.pid);
      
      setTimeout(() => {
        process.exit(1);
      }, 100);
    });
  });

  // Print some infos on start process
  Log('cyan', `> [NODEREL]\x1b[0m v${pkg.version}`);
  Log('cyan', `> [NODE]\x1b[0m ${process.version}`);

  console.log(
    '\x1b[33m',
    `\n > [${new Date().toLocaleTimeString()}]\x1b[0m`,
    'NodeRel Start Running\x1b[33m'
  );

  console.log('\x1b[33m', '> [START COMMAND]\x1b[0m', `node ${config.entry || ResolveFilePath(config.entry)}`)
  console.log('\x1b[33m', '> [START WATCHING]\x1b[0m', cfg.watch + '\n')
}
