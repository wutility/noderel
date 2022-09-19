const kill = require('tree-kill');

/**
 * @param {String} pid 
 * @param {String} signal 
 * @returns 
 */
module.exports = function KillProcess(pid, signal = 'SIGTERM') {
  if(pid) return kill(pid, signal)
}