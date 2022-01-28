const { EventEmitter } = require('events');

class MonitorEvent extends EventEmitter {}

const Monitor = new MonitorEvent();

module.exports = Monitor;