var nodemailer = require("nodemailer");

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
  var mailOptionsTos = "pblair12@gmail.com";
  for (var i = 0; i < group.leaders.length; i++) {
    mailOptionsTos += "," + group.leaders[i].username;
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
};

exports.sendAuditMessageEMail = function(user, message) {
//  if (user.username === "pblair12@gmail.com") {
//    return;
//  }

  var mailOptionsTos = "pblair12@gmail.com";

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
};

