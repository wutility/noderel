const spawn = require('cross-spawn');
const Log = require('./Log');

/**
 * @param {String} entryFile 
 * @returns 
 */
module.exports = function StartProcess(entryFile) {
  const childProcess = spawn('node', [entryFile], {
    env: {
      FORCE_COLOR: '1',
      NPM_CONFIG_COLOR: 'always',
      ...process.env,
    },
    stdio: 'pipe',
  });

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
  childProcess.stdin.pipe(process.stdin);

  ['spawn', 'close', 'message', 'disconnect', 'error', 'exit'].forEach(evt => {
    childProcess.on(evt, (signal) => {

      if(code || signal) Log('cyan', `[ChildProcess ${evt}] signal: ${signal}`);

      if (evt === 'error') {
        Log("err", code, signal);
        process.exit(1);
      }

      if (evt === 'exit') {
        process.stdin.unpipe(childProcess.stdin);

        if (code === 127) {
          Log('red', `Failed to start process signal: ${signal}`);
          process.exit();
        }
      }

    });
  });

  return childProcess
}