var logger = require('../config/logger');
var emailer = require('../utilities/emailer');

/**
 * Return an error response to a server request
 *
 * @param req, the request
 * @param res, the response
 * @param error, OPTIONAL - the Error object
 * @param status, OPTIONAL - the response status, defaults to 400 if not set
 */
exports.sendError = function(req, res, error, status) {
  // create an error if one was not passed in
  if (!error) {
    error = new Error('An error occurred');
  }

  // log the error
  if (req.user) {
    logger.error(req.user + " had an error");
  }
  logger.error(error);
  if (req.url && req.params) {
    logger.error(req.url + req.params);
  }

  // send an error report
  emailer.sendErrorMessageEmail(error.message);

  // set the status to 400 if it was not explicitly set already
  status = (status) ? status : 400;

  // return the status
  res.status(status);

  // return the error
  res.send({reason: error.message});
}

/**
 * Log the error to the console and send an email to the admins
 */
exports.logError = function(error, msg) {
  // log the error to the console
  logger.error(msg, error);

  // send an error report
  emailer.sendErrorMessageEmail(msg + error.message);
}