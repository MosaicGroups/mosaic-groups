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

const addSemester = async function (name) {
    mostRecentSemester = await Semester.create({ name });
    return getMostRecentSemesterSingleton();
};
export {
    addSemester,
    getMostRecentSemesterSingleton
};