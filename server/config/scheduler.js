var Group = require('mongoose').model('Group'),
  schedule = require('node-schedule'),
  emailer = require('../utilities/emailer'),
  reportGenerator = require('../utilities/reportGenerator');

module.exports = function(config) {
  if (config.scheduler.enabled) {
    var rule = new schedule.RecurrenceRule();
    rule.minute = config.scheduler.minute;
    rule.hour = config.scheduler.hour;

    console.log('A report will be sent every day at hour: ' + rule.hour + ' minute: ' + rule.minute);

    var j = schedule.scheduleJob(rule, function() {
      console.log('Sending Mosaic Groups Report');

      Group.find({}).populate('leaders').exec(function(err, collection) {
        var report = reportGenerator.createDailyReport(collection);
        emailer.sendGroupsReport(report);
      })
    });
  }
};