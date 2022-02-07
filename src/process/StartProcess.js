const spawn = require('cross-spawn'),
  Debounce = require('../util/Debounce');

/**
 * @param {String} entryFile 
 * @returns SpawnProcess
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

  Debounce(spawnProcess, 1000);

  spawnProcess.stdout.pipe(process.stdout);
  spawnProcess.stderr.pipe(process.stderr);
  spawnProcess.stdin.pipe(process.stdin);

  return spawnProcess
}