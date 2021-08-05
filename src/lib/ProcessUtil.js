const { watch } = require('chokidar')
const spawn = require('cross-spawn')
const kill = require('tree-kill')
const exec = require('child_process').exec

const log = require('./log')

module.exports = class ProcessUtil {

  childP

  static start (entryFile) {

    this.childP = spawn('node', [entryFile], {
      env: {
        FORCE_COLOR: '1',
        NPM_CONFIG_COLOR: 'always',
        ...process.env,
      },
      stdio: 'pipe',
    });

    this.childP.stdout.pipe(process.stdout)
    this.childP.stderr.pipe(process.stderr)
    this.childP.stdin.pipe(process.stdin)
    return this.childP
  }

  static kill ({ pid, signal = 'SIGTERM' }) {
    return new Promise((resolve) => {
      kill(pid, signal, resolve)
    })
  }

  static find (processName) {
    const childP = (() => {
      switch (process.platform) {
        case 'win32': return `tasklist /v /fi "STATUS eq running"`
        case 'darwin': return `ps -ax | grep ${processName}`
        case 'linux': return `ps -A`
        default: return false
      }
    })();

    return new Promise((resolve, reject) => {
      exec(childP, (err, stdout, stderr) => {
        if (err) reject(err)
        resolve(stdout)
      });
    });
  }

  static watchAndReload (entryFile, watchDir, ignore) {
    this.childP = ProcessUtil.start(entryFile)

    this.childP.on('error', (err) => {
      log(err, 'red')
      process.exit(1)
    });

    this.childP.on('exit', (code, signal) => {
      
      process.stdin.unpipe(this.childP.stdin)

      if (code === 127) {
        log(`Failed to start process signal: ${signal}`, 'red')
        process.exit()
      }
    });

    watch(watchDir, {
      ignored: ignore,
      ignoreInitial: true,
      ignorePermissionErrors: true,
      cwd: process.cwd(),
    })
      .on('change', () => {

        //log(`[FILE CHANGE] ${path} (${stats.size} Byte)`);

        setTimeout(async () => {        

          this.childP.kill()
          await ProcessUtil.kill({ pid: this.childP.pid })
          this.childP = ProcessUtil.start(entryFile)

          log(`\n[${new Date().toLocaleTimeString()}] RESTART DUE CHANGES\n`, 'cyan')
        }, 100);
      });
  }
}