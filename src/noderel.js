const path = require('path')
const fs = require('fs')
const { watch } = require('chokidar')

const ProcessUtil = require('./lib/ProcessUtil')

const loadPkg = () => {
  try {
    const parsedPkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))
    const entryFile = parsedPkg.main
    return entryFile
  } catch (err) {
    return {}
  }
}

const run = async (entryFile) => {
  let cmd = ProcessUtil.start(entryFile)

  watch('.', {
    ignored: '**/{node_modules,dist,temp,.git}/**',
    ignoreInitial: true,
    ignorePermissionErrors: true,
    cwd: process.cwd(),
  }).on('change', async (event, filepath) => {
    await ProcessUtil.kill({ pid: cmd.pid })
    cmd = ProcessUtil.start(entryFile)
  })
}

run('testr/server.js')