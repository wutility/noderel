const { watch: watchD } = require('chokidar');
const Monitor = require('./Monitor')

module.exports = function WatchChanges(config) {

  return watchD(config.watch, {
    ignored: config.ignore,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    cwd: process.cwd(),
  })
    .on('change', () => {
      setTimeout(() => {
        Monitor.emit('restart-spawn-process', config)
      }, config.delay);
    })
    .on('error', function (error) {
      if (error.code === 'EINVAL') {
        console.error('Watch failed. ' + error.code);
      } else {
        console.error('Watch failed: ' + error.message);
        process.exit(1);
      }
    });
}
