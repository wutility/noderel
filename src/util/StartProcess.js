const spawn = require('cross-spawn');

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

  return childProcess
}