process.env.NODE_ENV = 'test';
let mock = require('mock-require');

const blankFunct = () => { };
mock('../../server/utilities/emailer', {
    sendAuditMessageEMail: blankFunct,
    sendErrorMessageEmail: blankFunct,
    sendAddedMemberEMail: blankFunct
});
/*mock('../../server/utilities/errorHandler', {
    sendError: blankFunct,
    logError: blankFunct
});*/
let app = require('../../server');


exports.app = app;
