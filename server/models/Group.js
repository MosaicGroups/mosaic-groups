var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var groupSchema = mongoose.Schema({
  title: {
    type: String,
    required:'{PATH} is required!'},
  leaders: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  location: {
    type: String,
    required: '{PATH} is required!',
    unique:true},
  dayOfTheWeek: {
    type:String,
    required:'{PATH} is required!'},
  frequency: { // weekly, bi-weekly, monthly, various
    type:String,
    required:'{PATH} is required!'},
  genderType: { //men, women, co-ed (mutually exclusive)
    type:String,
    required:'{PATH} is required!'},
  childcare: {
    type: Boolean,
    default: false},
  topics: [String] // sports, book/bible study, food, discussion, hobby/interest(such as board games), service, finance (any that apply are allowed)
});

var Group = mongoose.model('Group', groupSchema);