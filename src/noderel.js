const ProcessUtil = require('./lib/ProcessUtil')
const loadFile = require('./lib/loadFile')

module.exports = async function noderel (config) {

  const cfg = {
    entry: loadFile(config.entry),
    watch: config.watch || '.',
    ignore: config.ignore || '**/{node_modules,dist,temp,.git}/**',
    wait: config.wait ? parseInt(config.wait, 10) : 100
  }
  
  ProcessUtil.watchAndReload(cfg)

  process.on('SIGTERM', function () {
    console.error(`Process SIGTERM`);
  });

  process.on('exit', function () {
    console.error(`Process exit with code: ${code}`);
  });

  // Print some infos on start process
  console.log('\x1b[33m', `\n > [${new Date().toLocaleTimeString()}]\x1b[0m`, '\x1b[32mNodeRel start running\x1b[33m')
  console.log('\x1b[33m', '> [START COMMAND]\x1b[0m', `node ${config.entry || loadFile(config.entry)}`)
  console.log('\x1b[33m', '> [START WATCHING]\x1b[0m', cfg.watch + '\n')
}
