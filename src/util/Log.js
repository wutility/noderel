const colors = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  crimson: "\x1b[38m",
  reset: "\x1b[0m",
  blink: "\x1b[5m"
}

/**
 * @param {String} msg 
 * @param {String} color 
 */
module.exports = function Log (color, msg) {
  console.log(colors[color || 'yellow'], ...msg, colors.reset)
}