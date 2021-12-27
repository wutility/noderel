const { watch : watchD } = require('chokidar');
const Log = require('./Log');

module.exports = function  WatchProcess (childProcess, { watch, ignore }) {

  childProcess.on('error', (err) => {
    Log(err, 'red');
    process.exit(1);
  });

  childProcess.on('exit', (code, signal) => {

    process.stdin.unpipe(childProcess.stdin);

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