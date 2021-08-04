const { watch } = require('chokidar')
const spawn = require('cross-spawn')
const kill = require('tree-kill')
const exec = require('child_process').exec

const log = require('./log')

module.exports = class ProcessUtil {
  static start (entryFile) {

    const cmd = spawn('node', [entryFile], {
      env: {
        FORCE_COLOR: '1',
        NPM_CONFIG_COLOR: 'always',
        ...process.env,
      },
      stdio: 'pipe',
    });

    //cmd.stdout.pipe(process.stdout)
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

  static watchAndReload (entryFile, watchDir, ignore) {
    let cmd = ProcessUtil.start(entryFile)

    cmd.stdout.on('data', (data) => {
      log(`${data}`)
    });

    cmd.on('error', (err) => {
      log(err, 'red')
    });

    watch(watchDir, {
      ignored: ignore,
      ignoreInitial: true,
      ignorePermissionErrors: true,
      cwd: process.cwd(),
    })
      .on('change', async (path, stats) => {
        if (stats) {
          log(`[File] ${path} (${stats.size} Byte)`);
        }

        cmd.kill()
        await ProcessUtil.kill({ pid: cmd.pid })
        cmd = ProcessUtil.start(entryFile)
      });
  }
}