var Settings = require('mongoose').model('Settings')
  emailer = require('../utilities/emailer');

exports.getSettings = function(req, res) {
  Settings.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.updateSettings = function(req, res) {
  console.log("updateUser");

  var settingsUpdates = req.body;
  var settingsId = settingsUpdates._id;
  delete settingsUpdates["_id"];

  // if not updating self or if this is an not admin user
  if(!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  Settings.findByIdAndUpdate(settingsId, settingsUpdates, undefined, function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    emailer.sendAuditMessageEMail(req.user.username + " updated the settings to: " + JSON.stringify(settingsUpdates));
    res.send(settingsUpdates);
  });
};
