const { watch } = require('chokidar')
const colors = require('./lib/colors')

const ProcessUtil = require('./lib/ProcessUtil')

// const noderel = async (cfg) => {
//   let cmd = ProcessUtil.start(cfg.entry)

//   watch(cfg.watch, {
//     ignored: '**/{node_modules,dist,temp,.git}/**',
//     ignoreInitial: true,
//     ignorePermissionErrors: true,
//     cwd: process.cwd(),
//   })
//     .on('change', async (path, stats) => {
//       if (stats) console.log(colors.yellow,`[File] ${path} changed size to ${stats.size}`, colors.reset);
//       await ProcessUtil.kill({ pid: cmd.pid })
//       cmd = ProcessUtil.start(cfg.entry)
//     })
// }

// noderel({
//   entry: 'tests/server.js',
//   watch: '.'
// })

ProcessUtil.find('node')
  .then(pss => {
    console.log(pss);
  })