var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// mongoose member collection
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
    }
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
    tryAddMember: function (memberData, userIsAuthenticated, errorCallback, successCallback) {
        var self = this;
        if (self.disabled) {
            errorCallback(new Error('Group has been disabled, you cannot join at this time.'));
        }
        if (self.isForLeadersOnly() && !userIsAuthenticated) {
            errorCallback(new Error('You must be logged in to join this group'));
        }
        Group.count({ 'members.email': memberData.email }, function (err, c) {
            if (err) { };
            if (c >= 2) {
                errorCallback(new Error('You have signed up for the maximum number of groups.'));
            }
            else {
                self.members.push(memberData);
                self.save(function (err) {
                    if (err) {
                        errorCallback(err);
                    }
                    else {
                        successCallback(null);
                    }
                });
            }
        });
    },
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
        )
};

exports.removeHashStr = removeHashStr;


