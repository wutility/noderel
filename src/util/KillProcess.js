const kill = require('tree-kill');

/**
 * 
 * @param {String} pid 
 * @param {String} signal 
 * @returns {Promise}
 */
module.exports = function KillProcess(pid, signal = 'SIGTERM') {
  return new Promise((resolve) => {
    kill(pid, signal, resolve)
  });
}