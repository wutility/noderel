const fs = require('fs')
const path = require('path')

const spawn = require('cross-spawn')
const kill = require('tree-kill')
const exec = require('child_process').exec

const loadPkg = () => {
  try {
    const parsedPkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))
    const entryFile = parsedPkg.main
    return entryFile
  } catch (err) {
    return {}
  }
}

module.exports = class ProcessUtil {
  static start (entryFile = loadPkg()) {
    console.log(loadPkg());
    const cmd = spawn('node', [entryFile], {
      env: {
        FORCE_COLOR: '1',
        NPM_CONFIG_COLOR: 'always',
        ...process.env,
      },
      stdio: 'pipe',
    });
    
    cmd.stdout.pipe(process.stdout)
    cmd.stderr.pipe(process.stderr)
    cmd.stdin.pipe(process.stdin)
    return cmd
  }

  static kill ({ pid, signal = 'SIGTERM' }) {
    return new Promise((resolve) => {
      kill(pid, signal, resolve)
    })
  }

  static find (processName) {
    const cmd = (() => {
      switch (process.platform) {
        case 'win32': return `tasklist /v /fi "STATUS eq running"`
        case 'darwin': return `ps -ax | grep ${processName}`
        case 'linux': return `ps -A`
        default: return false
      }
    })();

    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) reject(err)
        resolve(stdout)
      });
    });
  }
}