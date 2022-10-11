# ↻ ♾️ NodeRel
[NodeRel](https://wutility.github.io/noderel) is a tool that automatically restarting the node application when file changes.

![downloads](https://badgen.net/npm/dt/noderel) ![version](http://img.shields.io/npm/v/noderel.svg?style=flat-square)

- Fast and simple to use.
- Automatic re-running.
- Manual restarting.
- Monitoring multiple directories.
- Ignoring files.
- Delaying restarting.

# Installation
```shell
npm install -g noderel 
# yarn global add noderel
```

## CLI
```shell
# all configs are optional 
noderel --entry bin/server.js --watch routes,app --delay 150

# short
noderel -e server.js -w routes,app -d 150
```

# API
```js
const Noderel = require('noderel');
const noderel = Noderel(configuration?: Object): void

noderel.start()
noderel.stop()
```

# CLI options

| Prop                      | Default                    | Description                                 |
|---------------------------|----------------------------|---------------------------------------------|
|`--help`          or `-h`  | `-`                        | display usage info for all commands         |
|`--version`       or `-v`  | `-`                        | display package version                     |
|`--entry`         or `-e`  | `(package.json).main`      | Set entry file                              |
|`--watch`         or `-w`  | `.`                        | Set the watch directories or files.         |
|`--ignore`        or `-i`  | `node_modules,tests`       | which\'s files or folders should be ignored |
|`--delay`         or `-d`  | `100`                      | Realod time between changes (ms).           |
|`--verbose`       or `-V`  | `true`                     | Show logs                                   |
|`--allow-restart` or `-R`  | `true`                     | allow restart when typing `rs`              |
|`--override`      or `-O`  | `node (package.json).main` | override the default command                |

# Configuration file
```js
// noderel.json
// A config file can take any of the command line arguments as JSON key values, for example:
{
  "entry": "tests/server.js",
  "watch": ["src", "bin"],
  "ignore": ["node_modules", "tests", ".git"],
  "delay": 150,
  "verbose": true,
  "allowRestart": true, // allow restart when typing `rs`
  "override": "python3 app.py",
}
```

# Built with
- [Spawn childprocess](https://nodejs.org/docs/latest-v16.x/api/child_process.html#class-childprocess)
- [tree-kill](https://www.npmjs.com/package/tree-kill)
- [minimist](https://www.npmjs.com/package/minimist)
- [chokidar](https://www.npmjs.com/package/chokidar)

# Capture
![Capture](capture.png)

# License
![MIT](https://badgen.net/npm/license/noderel)