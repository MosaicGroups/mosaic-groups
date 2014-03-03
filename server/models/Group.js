var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var memberSchema = mongoose.Schema({
  firstName: {
    type:String,
    required:'{PATH} is required!'},
  lastName: {
    type:String,
    required:'{PATH} is required!'},
  email: {
    type: String,
    required: '{PATH} is required!'
  },
  status: { // status is either CONFIRMED, PENDING, or REMOVED
    type: String,
    required: '{PATH} is required!'
  }
});

var groupSchema = mongoose.Schema({
  title: {
    type: String,
    required:'{PATH} is required!',
    unique:true
  },
  leaders: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [
    memberSchema
  ],
  location: {
    type: String,
    required: '{PATH} is required!'
  },
  dayOfTheWeek: {
    type: String,
    required:'{PATH} is required!'},
  frequency: { // weekly, bi-weekly, monthly, various
    type: String,
    required:'{PATH} is required!'},
  genderType: { //men, women, co-ed (mutually exclusive)
    type: String,
    required:'{PATH} is required!'},
  childcare: {
    type: Boolean,
    default: false},
  topics: [String], // sports, book/bible study, food, discussion, hobby/interest(such as board games), service, finance (any that apply are allowed)
  description: {
    type: String,
    required:'{PATH} is required!'}
});

var Group = mongoose.model('Group', groupSchema);