const Monitor = require('./MonitorEvent'),
  { watch } = require('chokidar'),
  StartProcess = require('../process/StartProcess'),
  KillProcess = require('../process/KillProcess'),
  Log = require('../util/Log');

let spawnProcess;

Monitor.on('start-spawn-process', config => {
  spawnProcess = StartProcess(config.command);

  watch(config.watch, {
    ignored: config.ignore,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    cwd: process.cwd(),
  })
    .on('change', () => {
      setTimeout(() => { Monitor.emit('restart-spawn-process', config) }, config.delay);
    })
    .on('error', function (error) {
      if (error.code === 'EINVAL') {
        console.error('Watch failed. ' + error.code);
      } else {
        console.error('Watch failed: ' + error.message);
        process.exit(1);
      }
    });
});

Monitor.on('restart-spawn-process', config => {
  KillProcess(spawnProcess?.pid);
  spawnProcess = StartProcess(config.command);
  if(config.verbose) Log('cyan', `\n[${new Date().toLocaleTimeString()}] RESTART DUE CHANGES\n`);
});

Monitor.on('kill-spawn-process', (signal) => {
  const signalType = typeof signal === 'string' ? signal : 'SIGQUIT';
  const localTime = new Date().toLocaleTimeString();
  
  Log('green', `\n> [SIGNAL ${signalType} ${localTime}]\x1b[0m Noderel terminating...`);
  Log('green', ` x [KILL PROCESS ${localTime}]\x1b[0m ID: ${process.pid}`);

  process.removeAllListeners('data');  
  setTimeout(() => { process.exit(1); }, 100);
});

/**
   * SIGINT: CTRL+C
   * SIGQUIT: Keyboard quit
   * SIGTERM: kill command
   */
["SIGTERM", "SIGINT", "SIGHUP", "SIGQUIT"].forEach(evt => {
  process.on(evt, (signal) => {
    Monitor.emit('kill-spawn-process', signal);
  });
});

module.exports = Monitor;