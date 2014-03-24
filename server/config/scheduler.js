var schedule = require('node-schedule'),
  emailer = require('../utilities/emailer');

module.exports = function(config) {
  if (config.scheduler.enabled) {
    var rule = new schedule.RecurrenceRule();
    rule.minute = config.scheduler.minute;
    rule.hour = config.scheduler.hour;

    console.log('A report will be sent every day at hour: ' + rule.hour + ' minute: ' + rule.minute);

    var j = schedule.scheduleJob(rule, function() {
      console.log('Sending Mosaic Groups Report');
      emailer.sendGroupsReport();
    });
  }
};