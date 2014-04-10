var nodemailer = require("nodemailer"),
  User = require('mongoose').model('User'),
  Group = require('mongoose').model('Group'),
  reportGenerator = require('../utilities/reportGenerator');

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
    var tos = "";
    for (var i = 0; i < superadmins.length; i++) {
      tos += (tos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
    }
    for (var i = 0; i < group.leaders.length; i++) {
      tos += (tos.length === 0) ? group.leaders[i].username : "," + group.leaders[i].username;
    }
    var message = "Your group: " + group.title + " has a new member request from: \"" + newMemberData.firstName + " " + newMemberData.lastName + " <" + newMemberData.email + ">\"";
    sendEmail(tos, "Mosaic Group Audit Msg", message);
  });
};

exports.sendAuditMessageEMail = function(message) {
  User.find({'roles': 'superadmin'}).exec(function(err, superadmins) {
    var tos = "";
    for (var i = 0; i < superadmins.length; i++) {
      tos += (tos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
    }
    sendEmail(tos, "Mosaic Group Audit Msg", message);
  });
};

exports.sendGroupsReport = function(currUser) {
  Group.find({}).populate('leaders').exec(function(err, groups) {
    var report = reportGenerator.createDailyReport(groups);
    var tos = "";
    if (currUser) {
      sendEmail(currUser.username, "Mosaic Group Daily Report", report);
    } else {
      User.find({'roles': 'admin'}).exec(function(err, admins) {
        for (var i = 0; i < admins.length; i++) {
          tos += (tos.length === 0) ? admins[i].username : "," + admins[i].username;
        }
        sendEmail(tos, "Mosaic Group Daily Report", report);
      });
    }
  });
};

function sendEmail(tos, subject, message) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "mosaic.groups@gmail.com", // sender address
    to: tos, // list of receivers
    subject: subject, // Subject line
    html: message
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error) {
      console.log(error);
    }
  })
};
