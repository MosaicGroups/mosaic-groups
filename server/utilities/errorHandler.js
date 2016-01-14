var logger = require('../config/logger');
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
    err = new Error('An err occurred');
  }

  // log the error
  if (req.user) {
    logger.error(req.user + " had an error");
  }
  logger.error(err);
  if (req.url && req.params) {
    logger.error(req.url + req.params);
  }

  // send an error report
  emailer.sendErrorMessageEmail(err.message);

  // set the status to 400 if it was not explicitly set already
  status = (status) ? status : 400;

  // return the status
  res.status(status);

  // return the error
  res.send({reason: err.message});
}

/**
 * Log the error to the console and send an email to the admins
 */
exports.logError = function(err, msg) {
  // log the error to the console
  logger.error(msg, err);

  // send an error report
  emailer.sendErrorMessageEmail(msg + err.message);
}