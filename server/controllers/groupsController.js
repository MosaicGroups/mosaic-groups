var Group = require('mongoose').model('Group');

exports.getGroups = function(req, res) {
  console.log("getGroups")
  Group.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getGroup = function(req, res) {
  console.log("getGroup")
  var groupId = req.params._id;
  if (groupId) {
    console.log("finding one group")
    Group.findOne({_id: groupId}).exec(function(err, group) {
      res.send(group);
    });
  }
};

exports.saveGroup = function(req, res, next) {
  console.log("saveGroup")
  var groupData = req.body;
  Group.create(groupData, function(err, group) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate group title');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(group);
  })
};

exports.updateGroup = function(req, res) {
  var groupUpdates = req.body;
  if(req.user._id != groupUpdates.leader._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  Group.findByIdAndUpdate(groupUpdates._id, groupUpdates, undefined, function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    res.send(groupUpdates);
  });
};

exports.deleteGroup = function(req, res) {
  // get the group object from the request body that is to be deleted
  var groupDeleteId = req.params._id;
  // only admins can delete groups
  if(!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  // if there was no group object in the request then return bad request
  else if (groupDeleteId === undefined) {
    res.status(400);
    return res.end();
  }
  // otherwise, get the group from the database then delete them
  else {
      Group.findById(groupDeleteId).exec(function(err, collection) {
      var groupToDelete = collection;

      // if not found then return 404
      if(err) {
        res.status(404);
        return res.send({reason: err.toString()});
      }
      // if found then delete
      else {
        groupToDelete.remove(function(err) {
          if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
          }
          return res.end();
        });
      }
    });
  }
}