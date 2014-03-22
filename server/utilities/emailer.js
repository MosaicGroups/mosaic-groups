var nodemailer = require("nodemailer"),
  User = require('mongoose').model('User');

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
  var mailOptionsTos = "";
  User.find({'roles': 'superadmin'}).exec(function(err, superadmins) {
    for (var i = 0; i < superadmins.length; i++) {
      mailOptionsTos += (mailOptionsTos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
    }
    for (var i = 0; i < group.leaders.length; i++) {
      mailOptionsTos += (mailOptionsTos.length === 0) ? group.leaders[i].username : "," + group.leaders[i].username;
    }

    var message = "Your group: " + group.title + " has a new member request from: \"" + newMemberData.firstName + " " + newMemberData.lastName + " <" + newMemberData.email + ">\"";

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: "mosaic.groups@gmail.com", // sender address
      to: mailOptionsTos, // list of receivers
      subject: "New Member!", // Subject line
      text: message // plaintext body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Email message sent: " + response.message);
      }
    })
  });
};

exports.sendAuditMessageEMail = function(message) {
  var mailOptionsTos = "";
  User.find({'roles': 'superadmin'}).exec(function(err, superadmins) {
    for (var i = 0; i < superadmins.length; i++) {
      mailOptionsTos += (mailOptionsTos.length === 0) ? superadmins[i].username : "," + superadmins[i].username;
    }

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: "mosaic.groups@gmail.com", // sender address
      to: mailOptionsTos, // list of receivers
      subject: "Mosaic Group Update", // Subject line
      text: message // plaintext body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Email message sent: " + response.message);
      }
    })
  });
};

exports.sendGroupsReport = function(message) {
  var mailOptionsTos = "";
  User.find({'roles': 'admin'}).exec(function(err, admins) {
    for (var i = 0; i < admins.length; i++) {
      mailOptionsTos += (mailOptionsTos.length === 0) ? admins[i].username : "," + admins[i].username;
    }

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: "mosaic.groups@gmail.com", // sender address
      to: mailOptionsTos, // list of receivers
      subject: "Mosaic Group Daily Report", // Subject line
      html: message
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Email message sent: " + response.message);
      }
    })
  });
};

