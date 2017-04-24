let Group = require('mongoose').model('Group');
let errorHandler = require('../utilities/errorHandler');

let emailer = require('../utilities/emailer');
let semesterService = require('./semesterService');


/**
 * Add a member to a group
 * @param groupId
 * @param memberData
 * @param userIsAuthenticated
 * @param errorCallback
 * @param successCallback
 */
exports.addMembers = async function (groupId, members, userIsAuthenticated) {

    let mostRecentSemester = await semesterService.getMostRecentSemesterSingleton();
    //console.log('members', members);
    let group = await Group
        .findOne({ _id: groupId, semesterId: mostRecentSemester._id })
        .populate('leaders')
        .populate('members')
        .exec();

    if (group.disabled) {
        throw new Error('Group has been disabled, you cannot join at this time.', group);

    }
    if (group.isForLeadersOnly() && !userIsAuthenticated) {
        throw new Error('You must be logged in to join this group', group);

    }

    if (group.memberLimit < (members.length + group.members.length)) {
        throw new Error(`This group cannot accommodate ${members.length} more member(s)`);

    }
    for (const member of members) {
        let count = await Group.count({ 'members.email': member.email, semesterId: mostRecentSemester._id });
        if (count >= 2) {
            throw new Error(`You (${member.firstName} ${member.lastName} < ${member.email} > ) have signed up for the maximum number of groups.`, group);

        }
    }

    members.map(member => {
        return group.members.push(member);
    });

    await group.save();

    return group;
};

/**
 * Delete a group
 * @param groupDeleteId
 * @param callback
 */
exports.deleteGroup = function (groupDeleteId, callback) {
    if (groupDeleteId === undefined || groupDeleteId === null)
        callback(new Error('groupDeletedId is a required parameter', false));
    Group.findById(groupDeleteId)
        .exec(function (err, data) {
            // if not found then return 404
            if (err) callback(err, false);
            else {
                var deletedGroup = data;
                deletedGroup.remove(function (err) {
                    if (err) callback(err, false);
                    else {
                        callback(null, deletedGroup);
                    }
                });
            }
        });
};

exports.emailGroupReportToSelf = async function (user, callback) {

    let mostRecentSemester = await semesterService.getMostRecentSemesterSingleton();
    Group.find({ semesterId: mostRecentSemester._id })
        .populate('leaders')
        .exec(function (err, collection) {
            emailer.sendGroupsReport(user);
            emailer.sendAuditMessageEMail(user.username + ' requested an on demand daily report email');
            callback(err, collection);
        });
};

exports.emailUniqueReportToSelf = async function (user, callback) {
    let mostRecentSemester = await semesterService.getMostRecentSemesterSingleton();
    Group.find({ semesterId: mostRecentSemester._id }).populate('leaders').exec(function (err, collection) {
        emailer.emailUniqueReportToSelf(user);
        callback(err, collection);
    });
};

/**
 * Retrieve a group
 * @param groupId
 * @param callback
 */
exports.getGroup = function (groupId, callback) {
    if (groupId) {
        Group.findOne({
            _id: groupId
        })
            .populate('leaders').exec(function (err, group) {
                callback(err, group);
            });
    }
    else {
        callback(new Error('Group ID not defined.'));
    }
};

/**
 * Retrieve all groups
 * @param callback
 */
exports.getGroups = async function () {
    let mostRecentSemester = await semesterService.getMostRecentSemesterSingleton();
    let groups = await Group.find({ semesterId: mostRecentSemester._id }).populate('leaders').exec();

    let sortedGroups = groups.sort(function (g1, g2) {

        // if both morning and afternoon are the same for both dates
        if ((g1.meetingTime.indexOf('am') >= 0 && g2.meetingTime.indexOf('am') >= 0) || (g1.meetingTime.indexOf('pm') >= 0 && g2.meetingTime.indexOf('pm') >= 0)) {
            return g1.meetingTime > g2.meetingTime;
        }
        else {
            if (g1.meetingTime.indexOf('am') >= 0) {
                return -1;
            }
            else {
                return 1;
            }
        }
    });

    return sortedGroups;

    /*
            .exec(function (err, collection) {
            // sort by time of day
            let sortedCollection = collection
            callback(err, sortedCollection);
        });
        */
};

/**
 * Save a group
 * @param groupData
 * @param callback
 */
exports.saveGroup = async function (groupData) {
    let mostRecentSemester = await semesterService.getMostRecentSemesterSingleton();

    groupData.semesterId = mostRecentSemester._id;
    // ensure that all group members have a join date
    ensureJoinDates(groupData);

    let group = await Group.create(groupData);
    return group;

};

/**
 * Update a group
 * @param groupId
 * @param groupUpdates
 * @param callback
 */
exports.updateGroup = function (groupId, groupUpdates, callback) {
    // ensure that all group members have a join date
    ensureJoinDates(groupUpdates);
    Group.findByIdAndUpdate(groupId, groupUpdates, undefined, function (err) {
        callback(err);
    });
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