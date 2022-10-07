const { spawn } = require('child_process'),
  Debounce = require('../util/Debounce');

/**
 * @param {Array<String>} command 
 * @returns SpawnProcess
 */
module.exports = function StartProcess(command) {  

  const spawnProcess = spawn(command[0], command.slice(1), {
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