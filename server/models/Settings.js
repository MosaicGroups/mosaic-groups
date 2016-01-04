var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var settingsSchema = new mongoose.Schema({
    disableGroups: {
        type: Boolean,
        default: false
    },
    showNextSemesterMsg: {
        type: Boolean,
        default: false
    },
    nextSemesterMsg: {
        type: String,
        default: 'Next Semester Growth Groups Coming Soon...'
    },
    datesMsg: {
        type: String,
        default: ''
    }
});

var Settings = mongoose.model('Settings', settingsSchema);

function createDefaultSettings() {
    Settings.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            console.log("creating default settings");
            Settings.create({
                disableGroups: false
            });
        } else {
            console.log("not creating default settings because they are already created");
        }
    })
};

exports.createDefaultSettings = createDefaultSettings;