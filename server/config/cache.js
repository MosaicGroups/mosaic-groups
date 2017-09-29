module.exports.disableBrowserCache = function(req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
    return next();
};
