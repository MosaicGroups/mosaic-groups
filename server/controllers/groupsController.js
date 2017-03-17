let errorHandler = require('../utilities/errorHandler'),
    emailer = require('../utilities/emailer'),
    groupsService = require('../services/groupsService');

exports.emailGroupReportToSelf = function (req, res) {
    let user = req.user;
    groupsService.emailGroupReportToSelf(user, function () {
    });
    return res.end();
};

exports.emailUniqueReportToSelf = function (req, res) {
    let user = req.user;
    groupsService.emailUniqueReportToSelf(user, function () {
    });
    return res.end();
};


exports.getGroups = function (req, res) {
    groupsService.getGroups()
        .then(groups => {
            res.send(groups);
        })
        .catch(err => {
            errorHandler.sendError(req, res, err);
        });
    
};

exports.getGroup = function (req, res) {
    let groupId = req.params.id;
    groupsService.getGroup(groupId, function (err, group) {
        if (err) errorHandler.sendError(req, res, err);
        else {
            res.send(group);
        }
    });
};

exports.saveGroup = function (req, res) {
    let groupData = req.body;

    // if the leaderId is not set, or if this is not an admin user
    // then set the leaderId to the current user
    if (!groupData.leaders || groupData.leaders.length <= 0 || !req.user.hasRole('admin')) {
        groupData.leaders = [req.user._id];
    }

    groupsService.saveGroup(groupData)
        .then(group => {
            emailer.sendAuditMessageEMail('Group: "' + groupData.title + '" was created by: ' + req.user.username);
            res.send(group);
        })
        .catch(err => {
            errorHandler.sendError(req, res, err);
        });
    
      
};

exports.updateGroup = function (req, res) {
    let groupUpdates = req.body;
    let groupId = groupUpdates._id;
    delete groupUpdates['_id'];

    // if this is not an admin then the group must contain the current user as one of its leaders
    if (!req.user.hasRole('admin') && groupUpdates.leaders.indexOf(req.user.id) < 0) {
        res.status(403);
        return res.end();
    }

    groupsService.updateGroup(groupId, groupUpdates, function (err) {
        if (err) errorHandler.sendError(req, res, err);
        else {
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
    let members = [req.body.newMember];
    if (req.body.newMemberSpouse) {
        members.push(req.body.newMemberSpouse);
    }

    let status = 'PENDING';
    let joinDate = new Date();

    let groupId = req.params.id;
    let userIsAuthenticated = req.isAuthenticated();

    members = members.map(member => {
        member.status = status;
        member.joinDate = joinDate;
        return member;
    });

    groupsService.addMembers(groupId, members, userIsAuthenticated)
        .then(group => {
            members.map(member => {
                emailer.sendAddedMemberEMail(group, member, function (err) {
                    if (err) errorHandler.logError(err, 'Unable to send email that a member was added');
                    emailer.sendMemberConfirmationEmail(group, member, function (err) {
                        if (err) errorHandler.logError(err, 'Unable to send email for group add confirmation');
                    });
                });
            });    
            return group;
        })
        .then(() => {
            return res.send({success: true});
        })
        .catch(err => {
            //console.log(err);
            errorHandler.sendError(req, res, err);
        });


};


//return res.end();
/**
 * Delete a group
 * @param req
 * @param res
 */
exports.deleteGroup = function (req, res) {
    // get the group object from the request body that is to be deleted
    let groupDeleteId = req.params.id;

    // only admins can delete groups
    if (!req.user || !req.user.hasRole('admin')) {
        errorHandler.sendError(req, res, new Error('only admin users may delete a group'), 403);
    }
    // otherwise, get the group from the database then delete them
    else {
        groupsService.deleteGroup(groupDeleteId, function (err, deletedGroup) {
            if (err) errorHandler.sendError(req, res, err);
            else {
                emailer.sendAuditMessageEMail('Group: "' + deletedGroup.title + '" was deleted by: ' + req.user.username);
                return res.end();
            }
        });
    }
};