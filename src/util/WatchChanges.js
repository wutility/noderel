const { watch: watchD } = require('chokidar');

module.exports = function WatchChanges({ watch, ignore }) {
  return watchD(watch, {
    ignored: ignore,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    cwd: process.cwd(),
  });
}