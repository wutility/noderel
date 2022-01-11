# NodeRel
NodeRel is a tool that automatically restarting the node application when file changes.

[downloads]: https://badgen.net/npm/dt/noderel
[version]:       http://img.shields.io/npm/v/noderel.svg?style=flat-square

# Installation
```shell
npm install --save-dev noderel
```

# CLI
```shell
# all configs are optional 
noderel --entry bin/server.js --watch routes,app --wait 150 --verbose false
```

# API
```js
const noderel = require('noderel')

noderel(configuration?: Object): void
```

## Configuration

| Prop     | Default                          | Description                   |
|----------|----------------------------------|-------------------------------|
|entry     | `(package.json).main`            | Set entry file |
|watch     | `.`                              | Set the watch directories or files. |
|ignore   | `/node_modules\|(^\|[\/\\])\../` | which\'s files or folders should be ignored |
|wait      | `100`                            | Realod time between changes (ms). |
|verbose   | `true`                          | Show logs |
|allow-restart | `false` | allow restart when typing `rs`|

## Capture
![Capture](capture.png)

# License
MIT

[license]: https://badgen.net/npm/license/noderel
