const spawn = require('cross-spawn'),
  debounce = require('../util/debounce');

/**
 * @param {String} entryFile 
 * @returns 
 */
module.exports = function StartProcess(entryFile) {

  const spawnProcess = spawn('node', [entryFile], {
    env: {
      FORCE_COLOR: '1',
      NPM_CONFIG_COLOR: 'always',
      ...process.env,
    },
    stdio: 'pipe',
  });

  debounce(spawnProcess, 1000);

  spawnProcess.stdout.pipe(process.stdout);
  spawnProcess.stderr.pipe(process.stderr);
  spawnProcess.stdin.pipe(process.stdin);

  return spawnProcess
}