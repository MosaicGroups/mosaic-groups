var nodemailer = require("nodemailer"),
    User = require('mongoose').model('User'),
    Group = require('mongoose').model('Group'),
    reportGenerator = require('../utilities/reportGenerator'),
    config = require('../config/config');

var emailSubjectPrefix = "[mosaic-groups]";

exports.sendAddedMemberEMail = function (group, newMemberData) {
    User.find({
        'roles': 'superadmin'
    }).exec(function (err, superadmins) {
        var superadminTos = "";
        var tos = "";
        for (var i = 0; i < superadmins.length; i++) {
            superadminTos += (superadminTos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
        }
        for (var i = 0; i < group.leaders.length; i++) {
            tos += (tos.length === 0) ? group.leaders[i].username : "," + group.leaders[i].username;
        }
        var message = 'Mosaic Group: "' + group.title + '" has a new member request from: "' + newMemberData.firstName + ' ' +
            newMemberData.lastName + '" &lt;' + newMemberData.email + '&gt;.';

        sendEmail(superadminTos, 'Audit Msg', message);
        sendEmail(tos, 'New Member', message);
    });
};

exports.sendMemberConfirmationEmail = function (group, newMemberData) {
    var groupLeaders = "";
    for (var i = 0; i < group.leaders.length; i++) {
        var groupLeader = '"' + group.leaders[i].firstName + ' ' + group.leaders[i].lastName + '&lt;' + group.leaders[i].username + '&gt;';
        groupLeaders += (groupLeaders.length === 0) ? groupLeader : ", " + groupLeader;
    }
    var message = 'You are registered for the group: "' + group.title + '"' +
        '. The group leader(s): ' + groupLeaders + ' will be contacting you soon!!';
    sendEmail(newMemberData.email, "Mosaic Group Confirmation", message);
}

exports.sendAuditMessageEMail = function (message) {
    User.find({
        'roles': 'superadmin'
    }).exec(function (err, superadmins) {
        var superadminTos = "";
        for (var i = 0; i < superadmins.length; i++) {
            superadminTos += (superadminTos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
        }
        sendEmail(superadminTos, "Audit Msg", message);
    });
};

exports.sendErrorMessageEMail = function (message) {
    User.find({
        'roles': 'superadmin'
    }).exec(function (err, superadmins) {
        var superadminTos = "";
        for (var i = 0; i < superadmins.length; i++) {
            superadminTos += (superadminTos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
        }
        sendEmail(superadminTos, "Error Msg", message);
    });
};

exports.sendGroupsReport = function (currUser) {
    Group.find({}).populate('leaders').exec(function (err, groups) {
        var report = reportGenerator.createDailyReport(groups);
        var adminTos = "";
        if (currUser) {
            sendEmail(currUser.username, "Daily Report", report);
        } else {
            User.find({
                'roles': 'admin'
            }).exec(function (err, admins) {
                for (var i = 0; i < admins.length; i++) {
                    adminTos += (adminTos.length === 0) ? admins[i].username : "," + admins[i].username;
                }
                sendEmail(adminTos, "Daily Report", report);
            });
        }
    });
};

exports.sendDistinctMembersReport = function (currUser) {

    reportGenerator.generateDistinctUsersReport(Group, function (report) {
        var adminTos = "";

        var attachment = {
            filename: "distinctmembers.csv",
            contents: report,
            contentType: 'text/csv'
        }
        var attachments = [];

        attachments.push(attachment);

        sendEmail("jeffreysklassen@gmail.com, agnes@mosaicchristian.org", "Distinct Members", "Here is your distinct members report.", attachments);

    });

    console.log("sent!!!");
};
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "mosaic.groups@gmail.com",
        pass: config.emailer.password
    }
});

var sendEmail = function (tos, subject, message, attachments) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "mosaic.groups@gmail.com", // sender address
        to: tos, // list of receivers
        subject: emailSubjectPrefix + " " + subject, // Subject line
        html: message,
        attachments: attachments
    }

    if (attachments) {
        mailOptions.attachments = attachments;
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("Error sending email", error);
        } else {
            console.log(response);
        }
    })
};