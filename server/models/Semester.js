var logger = require('../config/logger');
var mongoose = require('mongoose');

var semesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!'
    },
    startDate: {
        type: Date,
        required: '{PATH} is required!'
    },
});

var Semester = mongoose.model('Semester', semesterSchema);

function createDefaultSemester() {
    Semester.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            logger.log('creating default semester');
            Semester.create({
                name: 'Previous Semesters',
                startDate: new Date()
            });
        } else {
            logger.log('not creating default settings because they are already created');
        }
    });
}
exports.createDefaultSemester = createDefaultSemester;