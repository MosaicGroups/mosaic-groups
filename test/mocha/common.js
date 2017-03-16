process.env.NODE_ENV = 'test';
let mock = require('mock-require');
mock('../../server/utilities/emailer', {
    sendAuditMessageEMail: function () {
        //console.log('emailer.sendAuditMessageEMail called');
    },
    sendErrorMessageEmail: function () {
        //console.log('emailer.sendErrorMessageEmail called');
    }
});
let app = require('../../server');


exports.app = app;
