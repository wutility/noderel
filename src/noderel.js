const StartProcess = require('./util/StartProcess');
const KillProcess = require('./util/KillProcess');
const WatchProcess = require('./util/WatchProcess');

const Log = require('./util/Log');
const ResolveFilePath = require('./util/ResolveFilePath');

module.exports = async function noderel(config) {

  const cfg = {
    entry: ResolveFilePath(config.entry),
    watch: config.watch || '.',
    ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**',
    wait: config.wait ? parseInt(config.wait, 10) : 100
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

  ['unhandledRejection', 'uncaughtExceptionMonitor', 'uncaughtException', 'rejectionHandled',
    'beforeExit', 'disconnect', 'SIGTERM', 'exit'].forEach(evt => {
      process.on('SIGTERM', (code, signal) => {
        console.error(`Process event --> `, code, signal);
      });
    });

  // Print some infos on start process
  console.log(
    '\x1b[33m',
    `\n > [${new Date().toLocaleTimeString()}]\x1b[0m`,
    '\x1b[32mNodeRel start running\x1b[33m'
  );

  console.log('\x1b[33m', '> [START COMMAND]\x1b[0m', `node ${config.entry || ResolveFilePath(config.entry)}`)
  console.log('\x1b[33m', '> [START WATCHING]\x1b[0m', cfg.watch + '\n')
}
