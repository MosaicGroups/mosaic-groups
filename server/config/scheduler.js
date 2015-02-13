var schedule = require('node-schedule');
var emailer = require('../utilities/emailer');
var config = require('./config');

module.exports = function() {
  if (config.scheduler.enabled) {
    var rule = new schedule.RecurrenceRule();
    rule.minute = config.scheduler.minute;
    rule.hour = config.scheduler.hour;

    console.log('A report will be sent every day at hour: ' + rule.hour + ' minute: ' + rule.minute);

    var j = schedule.scheduleJob(rule, function() {
      emailer.sendGroupsReport();
    });
  }
};