var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// mongoose member collection
var contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: '"First Name" is required!'
    },
    lastName: {
        type: String,
        required: '"Last Name" is required!'
    },
    email: {
        type: String,
        required: '"Email" is required!'
    },
    phone: {
        type: String,
        required: '"Phone Number" is required!'
    },
});

var memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: '"First Name" is required!'
    },
    lastName: {
        type: String,
        required: '"Last Name" is required!'
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
    emergency_contact: {
        type: contactSchema
    },
});

// mongoose group collection
var groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: '{PATH} is required!'
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
        required: '{PATH} is required!'
    },
    meetingTime: {
        type: String,
        required: '{PATH} is required!'
    },
    audienceType: {
        type: String,
        required: '{PATH} is required!'
    },
    childcare: {
        type: Boolean,
        default: false
    },
    topics: [String], // see complete list in public/app/constants/availableTopics.js
    description: {
        type: String,
        required: '{PATH} is required!'
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

groupSchema.methods = {
    isForLeadersOnly: function () {
        return this.audienceType && this.audienceType === 'Group Leaders';
    }
};

var Member = mongoose.model('Member', memberSchema);
var Group = mongoose.model('Group', groupSchema);

function removeHashStr() {
    Member.update(
        { 'uniqueId': { '$exists': true } },  // Query
        { '$unset': { 'uniqueId': true } },  // Update
        { 'multi': true }                    // Options
    );
}

exports.removeHashStr = removeHashStr;


