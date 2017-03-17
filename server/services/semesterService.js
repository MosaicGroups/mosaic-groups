let Semester = require('mongoose').model('Semester');

let mostRecentSemester;

const getMostRecentSemesterSingleton = async function () {
    if (!mostRecentSemester) {
        mostRecentSemester = await Semester.findOne().sort('-startDate').exec();
    }

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