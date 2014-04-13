var Settings = require('mongoose').model('Settings')
  emailer = require('../utilities/emailer');

exports.getSettings = function(req, res) {
  Settings.findOne({}).exec(function(err, data) {
    res.send(data);
  });
};

exports.requiresGroupsEnabled = function(req, res, next) {
  Settings.findOne({}).exec(function(err, data) {
    if(data.disableGroups) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  });
}

exports.updateSettings = function(req, res) {
  var settingsUpdates = req.body;
  var settingsId = settingsUpdates._id;
  delete settingsUpdates["_id"];

  // if not updating self or if this is an not admin user
  if(!req.user.hasRole('admin')) {
    errorHandler.sendError(req, res, err, 403);
  }
  else {
    Settings.findByIdAndUpdate(settingsId, settingsUpdates, undefined, function(err) {
      if(err) { errorHandler.sendError(req, res, err); }
      else {
        emailer.sendAuditMessageEMail(req.user.username + " updated the settings to: " + JSON.stringify(settingsUpdates));
        settingsUpdates._id = settingsId;
        res.send(settingsUpdates);
      }
    });
  }
};
