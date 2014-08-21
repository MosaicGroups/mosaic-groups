var emailer = require('../utilities/emailer');

/**
 * Return an error response to a server request
 *
 * @param req, the request
 * @param res, the response
 * @param err, OPTIONAL - the Error object
 * @param status, OPTIONAL - the response status, defaults to 400 if not set
 */
exports.sendError = function(req, res, err, status) {
  // create an error if one was not passed in
  if (!err) {
    err = new Error('An error occurred');
  }

  // log the error
  if (req.user) {
    console.error("Error: " + req.user + " had an error");
  }
  console.error("Error: " + err);
  if (req.url && req.params) {
    console.log("Error: " + req.url + req.params);
  }

  // send an error report
  emailer.sendErrorMessageEMail(err.toString());

  // set the status to 400 if it was not explicitly set already
  status = (status) ? status : 400;

  // return the status
  res.status(status);

  // return the error
  res.send({reason: err.toString()});
}