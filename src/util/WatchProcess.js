const { watch: watchD } = require('chokidar');
const Log = require('./Log');

module.exports = function WatchProcess(childProcess, { watch, ignore }) {

  ['close', 'message', 'disconnect'].forEach(evt => {
    childProcess.on(evt, (code, signal) => {
      console.log(
        `child process terminated due to receipt of signal ${signal}`);
    });
  })

  childProcess.on('error', (err) => {
    Log(err, 'red');
    process.exit(1);
  });

  childProcess.on('exit', (code, signal) => {

    process.stdin.unpipe(childProcess.stdin);

    console.log('----------- > Exti');

    if (code === 127) {
      Log(`Failed to start process signal: ${signal}`, 'red');
      process.exit();
    }
  });

  return watchD(watch, {
    ignored: ignore,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    cwd: process.cwd(),
  });
}