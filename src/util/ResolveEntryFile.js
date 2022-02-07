const fs = require('fs'),
  path = require('path');

/**
 * @param {String} entryFile 
 * @returns {String} entryFilePath
 */
module.exports = function ResolveEntryFile(entryFile) {
  try {
    if (entryFile) {
      return path.relative(process.cwd(), entryFile);
    }
    else {
      return JSON.parse(fs.readFileSync(path.relative(process.cwd(), 'package.json'), 'utf8')).main
    }
  } catch (err) {
    process.exit(1)
  }
}