const { EventEmitter } = require('node:events');
//const Log = require('./Log');

class MonitorEvent extends EventEmitter { }

const Monitor = new MonitorEvent();

Monitor.on('reload-process', () => {
  console.log('an event occurred!');
});

module.exports = Monitor;