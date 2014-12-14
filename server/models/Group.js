var mongoose = require('mongoose'),
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
  audienceType: {
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
  },
  disabled: {
    type: Boolean,
    default: false
  }
});


var Member = mongoose.model('Member', memberSchema);
var Group = mongoose.model('Group', groupSchema);

function removeHashStr() {
  Member.update(
    { 'uniqueId': { '$exists': true } },  // Query
    { '$unset': { 'uniqueId': true  } },  // Update
    { 'multi': true }                    // Options
  )
};

exports.removeHashStr = removeHashStr;


