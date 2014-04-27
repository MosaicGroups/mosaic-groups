var hash = require('ys-hash')
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var memberSchema = mongoose.Schema({
  firstName: {
    type:String,
    required:'"First Name" is required!'
  },
  lastName: {
    type:String,
    required:'"Last Name" is required!'
  },
  email: {
    type: String
  },
  status: { // status is either PENDING, APPROVED, or REMOVED
    type: String,
    required: '"Status" is required!'
  },
  joinDate: {
    type: Date,
    required: '"Join Date" is required!'
  },
  uniqueId: {
    type: String,
    required: '"Unique ID" is required!'
  }
});

var groupSchema = mongoose.Schema({
  title: {
    type: String,
    required:'{PATH} is required!'
  },
  leaders: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [
    memberSchema
  ],
  memberLimit: {
    type: Number,
    required: '{PATH} is required!'
  },
  location: {
    type: String,
    required: '{PATH} is required!'
  },
  dayOfTheWeek: {
    type: String,
    required:'{PATH} is required!'
  },
  meetingTime: {
    type: String,
    required:'{PATH} is required!'
  },
  genderType: { //men, women, co-ed (mutually exclusive)
    type: String,
    required:'{PATH} is required!'
  },
  childcare: {
    type: Boolean,
    default: false
  },
  topics: [String], // see complete list in public/app/constants/availableTopics.js
  description: {
    type: String,
    required:'{PATH} is required!'
  }
});

var Group = mongoose.model('Group', groupSchema);

function ensureJoinDates(group) {
  if (group.members) {
    for (var i = 0; i < group.members.length; i++) {
      var member = group.members[i];
      if (!member.joinDate) {
        member.joinDate = new Date();
      }
    }
  }
};

function ensureUniqueIds() {
  Group.find({}).exec(function(err, groups) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      var groupModified = ensureUniqueIdsForGroup(group);
      if (groupModified) {
        console.log("Updating the uniqueIds for some of the members in the group: \"" + group.title + "\"");
        if (group.save) {
          group.save();
        }
      }
    }
  })
};

function ensureUniqueIdsForGroup(group) {
  var groupModified = false;
  for (var j = 0; j < group.members.length; j++) {
    var member = group.members[j];
    if (!member.uniqueId) {
      groupModified = true;
      generateUniqueMemberId(member);
    }
  }
  return groupModified;
};

function generateUniqueMemberId(member) {
  var uniqueString = member.firstName.trim().toLowerCase() + member.lastName.trim().toLowerCase() + member.email.trim().toLowerCase();
  var uniqueId = hash.hash_str(uniqueString);
  member.uniqueId = uniqueId;
};

exports.ensureJoinDates = ensureJoinDates;
exports.ensureUniqueIds = ensureUniqueIds;
exports.ensureUniqueIdsForGroup = ensureUniqueIdsForGroup;
exports.generateUniqueMemberId = generateUniqueMemberId;