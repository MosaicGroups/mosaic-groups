var logger = require('../config/logger');
var Group = require('mongoose').model('Group');
var errorHandler = require('../utilities/errorHandler');

/**
 * Add a member to a group
 * @param groupId
 * @param memberData
 * @param userIsAuthenticated
 * @param errorCallback
 * @param successCallback
 */
exports.addMember = function (groupId, memberData, userIsAuthenticated, errorCallback, successCallback) {
    Group.findOne({
        _id: groupId
    }).populate('leaders').exec(function (err, group) {
        if (err) {
            errorCallback(err, group);
        } else {
            if (group.disabled) {
                errorCallback(new Error('Group has been disabled, you cannot join at this time.'), group);
            }
            if (group.isForLeadersOnly() && !userIsAuthenticated) {
                errorCallback(new Error('You must be logged in to join this group'), group);
            }
            Group.count({ 'members.email': memberData.email }, function (err, c) {
                if (err) { };
                if (c >= 2) {
                    errorCallback(new Error('You (' + memberData.firstName + ' ' + memberData.lastName + ' <' + memberData.email + '>' + ') have signed up for the maximum number of groups.'), group);
                }
                else {
                    group.members.push(memberData);
                    group.save(function (err) {
                        if (err) {
                            errorCallback(err, group);
                        }
                        else {
                            successCallback(null, group);
                        }
                    });
                }
            });
        }
    });
};

/**
 * Delete a group
 * @param groupDeleteId
 * @param callback
 */
exports.deleteGroup = function (groupDeleteId, callback) {
    if (groupDeleteId === undefined || groupDeleteId === null) callback(new Error('groupDeletedId is a required parameter', false));
    Group.findById(groupDeleteId).exec(function (error, data) {
        // if not found then return 404
        if (error) { callback(error, false); }
        else {
            var deletedGroup = data;
            deletedGroup.remove(function (error) {
                if (error) { callback(error, false); }
                else {
                    callback(null, deletedGroup);
                }
            });
        }
    });
};



/**
 * Retrieve a group
 * @param groupDeleteId
 * @param callback
 */
exports.getGroup = function (groupId, callback) {
    if (groupId) {
        Group.findOne({
            _id: groupId
        }).populate('leaders').exec(function (err, group) {
            callback(err, group);
        });
    }
    else {
        callback(new Error("Group ID not defined."));
    }
};

/**
 * Retrieve all groups
 * @param callback
 */
exports.getGroups = function (callback) {
   Group.find({}).populate('leaders').exec(function (err, collection) {
       callback(err, collection);
    });
};