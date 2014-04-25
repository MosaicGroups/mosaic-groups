var Group = require('mongoose').model('Group'),
  User = require('mongoose').model('User'),
  emailer = require('../utilities/emailer'),
  errorHandler = require('../utilities/errorHandler'),
  objectDiff = require('objectDiff');

exports.emailGroupReportToSelf = function(req, res) {
  Group.find({}).populate('leaders').exec(function(err, collection) {
    emailer.sendGroupsReport(req.user);
    emailer.sendAuditMessageEMail(req.user.username + " requested an on demand daily report email");
  });
  return res.end();
};

exports.getGroups = function(req, res) {
  Group.find({}).populate('leaders').exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getGroup = function(req, res) {
  var groupId = req.params.id;
  if (groupId) {
    Group.findOne({_id: groupId}).populate('leaders').exec(function(err, group) {
      res.send(group);
    });
  }
};

exports.saveGroup = function(req, res, next) {
  var groupData = req.body;

  // if the leaderId is not set, or if this is not an admin user
  // then set the leaderId to the current user
  if (!groupData.leaders || groupData.leaders.length <= 0 || !req.user.hasRole('admin')) {
    groupData.leaders = [req.user._id];
  }

  Group.create(groupData, function(err, group) {
    if(err) { errorHandler.sendError(req, res, err); }
    else {
      emailer.sendAuditMessageEMail('Group: "' + groupData.title + '" was created by: ' + req.user.username);
      res.send(group);
    }
  })
};

exports.updateGroup = function(req, res) {
  var groupUpdates = req.body;
  var groupId = groupUpdates._id;
  delete groupUpdates["_id"];

  if(req.user.id !== groupUpdates.leaders[0] && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  Group.findByIdAndUpdate(groupId, groupUpdates, undefined, function(err) {
    if(err) { errorHandler.sendError(req, res, err); }
    else {
      groupUpdates._id = groupId;
      emailer.sendAuditMessageEMail('Group: "' + groupUpdates.title + ' was updated by: ' + req.user.username);
      res.send(groupUpdates);
    }
  });
};

/**
 * Add a member to a group.  The member is stored in the group.newMember property and it
 * has the properties firstName, lastName, and email.
 *
 * Note: to remove all members from a group from the mongo command line, use the command:
 * db.groups.update({"title":"<group-title>"}, {$pull:{"members":{}}})
 *
 * @param req
 * @param res
 */
exports.addMember = function(req, res) {
  var memberData = req.body.newMember;
  memberData.status = "PENDING";
  memberData.joinDate = new Date();

  var groupId = req.params.id;

  Group.findOne({_id: groupId}).populate('leaders').exec(function(err, group) {
    if(err) { errorHandler.sendError(req, res, err); }
    else {
      group.members.push(memberData);
      group.save(function(err) {
        if(err) { errorHandler.sendError(req, res, err); }
        else {
          emailer.sendAddedMemberEMail(group, memberData);
          emailer.sendMemberConfirmationEmail(group, memberData);
          return res.end();
        }
      });
    }
  });
};

exports.deleteGroup = function(req, res) {
  // get the group object from the request body that is to be deleted
  var groupDeleteId = req.params.id;
  // only admins can delete groups
  if(!req.user.hasRole('admin')) {
    errorHandler.sendError(req, res, err, 403);
  }
  // if there was no group object in the request then return bad request
  else if (groupDeleteId === undefined) {
    errorHandler.sendError(req, res, err);
  }
  // otherwise, get the group from the database then delete them
  else {
    Group.findById(groupDeleteId).exec(function(err, data) {
      // if not found then return 404
      if(err) { errorHandler.sendError(req, res, err); }
      else {
        var groupToDelete = data;
        groupToDelete.remove(function(err) {
          if(err) { errorHandler.sendError(req, res, err); }
          else {
            emailer.sendAuditMessageEMail('Group: "' + groupToDelete.title + '" was deleted by: ' + req.user.username);
            return res.end();
          }
        });
      }
    });
  }
};