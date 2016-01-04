var logger = require('./logger');
var schedule = require('node-schedule');
var emailer = require('../utilities/emailer');
var config = require('./config');

module.exports = function () {
    if (config.scheduler.enabledGroupReport) {
      var rule = new schedule.RecurrenceRule();
      rule.minute = config.scheduler.minute;
      rule.hour = config.scheduler.hour;

      logger.log('A groups report will be sent every day at hour: ' + rule.hour + ' minute: ' + rule.minute);
      var j = schedule.scheduleJob(rule, function () {
        emailer.sendGroupsReport();
      });
    } else {
      logger.log('Group reports are currently disabled');
    }

    if (config.scheduler.enabledDistinctMembersReport) {
      var rule = new schedule.RecurrenceRule();
      rule.minute = config.scheduler.minute;
      rule.hour = config.scheduler.hour;

      logger.log('A distinct members report will be sent every day at hour: ' + rule.hour + ' minute: ' + rule.minute);
      var i = schedule.scheduleJob("0 0 * * 0", function () {
        emailer.sendDistinctMembersReport();
      });
    } else {
      logger.log('Distinct members reports are currently disabled');
    }
};