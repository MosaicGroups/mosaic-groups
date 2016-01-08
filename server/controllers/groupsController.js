var logger = require('../config/logger');
var Group = require('mongoose').model('Group'),
    User = require('mongoose').model('User'),
    Member = require('mongoose').model('Member'),
    Settings = require('mongoose').model('Settings'),
    emailer = require('../utilities/emailer'),
    errorHandler = require('../utilities/errorHandler'),
    groupsService = require('../services/groupsService');

exports.emailGroupReportToSelf = function (req, res) {
    Group.find({}).populate('leaders').exec(function (err, collection) {
        emailer.sendGroupsReport(req.user);
        emailer.sendAuditMessageEMail(req.user.username + " requested an on demand daily report email");
    });
    return res.end();
};

exports.emailUniqueReportToSelf = function (req, res) {
    Group.find({}).populate('leaders').exec(function (err, collection) {
        emailer.emailUniqueReportToSelf(req.user);
    });
    return res.end();
};


exports.getGroups = function (req, res) {
    Group.find({}).populate('leaders').exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getGroup = function (req, res) {
    var groupId = req.params.id;
    groupsService.getGroup(groupId, function (err, group) {
        if (err) {
            errorHandler.sendError(req, res, err);
        } else {
            res.send(group);
        }
    });
};

exports.saveGroup = function (req, res, next) {
    var groupData = req.body;

    // if the leaderId is not set, or if this is not an admin user
    // then set the leaderId to the current user
    if (!groupData.leaders || groupData.leaders.length <= 0 || !req.user.hasRole('admin')) {
        groupData.leaders = [req.user._id];
    }

    // ensure that all group members have a join date
    ensureJoinDates(groupData);

    Group.create(groupData, function (err, group) {
        if (err) {
            errorHandler.sendError(req, res, err);
        } else {
            emailer.sendAuditMessageEMail('Group: "' + groupData.title + '" was created by: ' + req.user.username);
            res.send(group);
        }
    })
};

exports.updateGroup = function (req, res) {
    var groupUpdates = req.body;
    var groupId = groupUpdates._id;
    delete groupUpdates["_id"];

    // if this is not an admin then the group must contain the current user as one of its leaders
    if (!req.user.hasRole('admin') && groupUpdates.leaders.indexOf(req.user.id) < 0) {
        res.status(403);
        return res.end();
    }

    // ensure that all group members have a join date
    ensureJoinDates(groupUpdates);

    Group.findByIdAndUpdate(groupId, groupUpdates, undefined, function (err) {
        if (err) {
            errorHandler.sendError(req, res, err);
        } else {
            groupUpdates._id = groupId;
            emailer.sendAuditMessageEMail('Group: "' + groupUpdates.title + '" was updated by: ' + req.user.username);
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
exports.addMember = function (req, res) {
    var memberData = req.body.newMember;
    memberData.status = "PENDING";
    memberData.joinDate = new Date();

    var groupId = req.params.id
    var userIsAuthenticated = req.isAuthenticated();

    groupsService.addMember(groupId, memberData, userIsAuthenticated, function (err) {
        errorHandler.sendError(req, res, err);
    }, function (err, group) {
        emailer.sendAddedMemberEMail(groupId, memberData, function (err, response) {
            if (err) {
                logger.log('Unable to send email', err);
                return res.end();
            } else {
                emailer.sendMemberConfirmationEmail(group, memberData, function (err, response) {
                    if (err) {
                        logger.log('Unable to send email', err);
                        return res.end();
                    } else {
                        return res.end();
                    }
                });
            }
        });
    })



};

/**
 * Delete a group
 * @param req
 * @param res
 */
exports.deleteGroup = function (req, res) {
    // get the group object from the request body that is to be deleted
    var groupDeleteId = req.params.id;

    // only admins can delete groups
    if (!req.user || !req.user.hasRole('admin')) {
        errorHandler.sendError(req, res, new Error('only admin users may delete a group'), 403);
    }
    // otherwise, get the group from the database then delete them
    else {
        groupsService.deleteGroup(groupDeleteId, function (error, deletedGroup) {
            if (error) {
                errorHandler.sendError(req, res, err);
            }
            else {
                emailer.sendAuditMessageEMail('Group: "' + deletedGroup.title + '" was deleted by: ' + req.user.username);
                return res.end();
            }
        })
    }
};

var ensureJoinDates = function (group) {
    if (group.members) {
        for (var i = 0; i < group.members.length; i++) {
            var member = group.members[i];
            if (!member.joinDate) {
                member.joinDate = new Date();
            }
        }
    }
};