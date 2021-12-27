const exec = require('child_process').exec;

/**
 * 
 * @param {String} processName 
 * @returns 
 */
module.exports = function FindProcess (processName) {
  const childProcess = (() => {
    switch (process.platform) {
      case 'win32': return `tasklist /v /fi "STATUS eq running"`
      case 'darwin': return `ps -ax | grep ${processName}`
      case 'linux': return `ps -A`
      default: return false
    }
  })();

  return new Promise((resolve, reject) => {
    exec(childProcess, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve(stdout)
    });
  });
}