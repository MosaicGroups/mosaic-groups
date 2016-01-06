var logger = require('../config/logger');
var Group = require('mongoose').model('Group');

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
        if (error) {  callback(error, false); }
        else {
          callback(null, deletedGroup);
        }
      });
    }
  });
};