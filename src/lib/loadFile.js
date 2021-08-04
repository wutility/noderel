const fs = require('fs')
const path = require('path')

module.exports = function loadFile (entryFile) {
  try {
    if (entryFile) {
      return path.resolve(process.cwd(), entryFile);
    }
    else {
      return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')).main
    }
  } catch (err) {
    process.exit(1)
  }
}