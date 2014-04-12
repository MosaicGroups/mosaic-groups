var nodemailer = require("nodemailer"),
  User = require('mongoose').model('User'),
  Group = require('mongoose').model('Group'),
  reportGenerator = require('../utilities/reportGenerator');

var emailSubjectPrefix = "[mosaic-groups]";

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "mosaic.groups@gmail.com",
    pass: "ilovemosiac!"
  }
});

// if you don't want to use this transport object anymore, uncomment following line
// smtpTransport.close(); // shut down the connection pool, no more messages

exports.sendAddedMemberEMail = function(group, newMemberData) {
  User.find({'roles': 'superadmin'}).exec(function(err, superadmins) {
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

exports.sendAuditMessageEMail = function(message) {
  User.find({'roles': 'superadmin'}).exec(function(err, superadmins) {
    var superadminTos = "";
    for (var i = 0; i < superadmins.length; i++) {
      superadminTos += (superadminTos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
    }
    sendEmail(superadminTos, "Audit Msg", message);
  });
};

exports.sendGroupsReport = function(currUser) {
  Group.find({}).populate('leaders').exec(function(err, groups) {
    var report = reportGenerator.createDailyReport(groups);
    var adminTos = "";
    if (currUser) {
      sendEmail(currUser.username, "Daily Report", report);
    } else {
      User.find({'roles': 'admin'}).exec(function(err, admins) {
        for (var i = 0; i < admins.length; i++) {
          adminTos += (adminTos.length === 0) ? admins[i].username : "," + admins[i].username;
        }
        sendEmail(adminTos, "Daily Report", report);
      });
    }
  });
};

function sendEmail(tos, subject, message) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "mosaic.groups@gmail.com", // sender address
    to: tos, // list of receivers
    subject: emailSubjectPrefix + " " + subject, // Subject line
    html: message
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error) {
      console.log("Error sending email", error);
    }
  })
};
