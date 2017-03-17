let Semester = require('mongoose').model('Semester');

let mostRecentSemester;

const getMostRecentSemesterSingleton = async function () {
    if (!mostRecentSemester) {
        console.log('No mostRecentSemester cached, querying database');

        mostRecentSemester = await Semester.findOne().sort('-startDate').exec();
    }
    
    console.log('returning semester')
    return mostRecentSemester;

};

export {
    getMostRecentSemesterSingleton
};