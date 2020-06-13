const passport = require('passport');
const { ErrorHandler } = require('../helpers/error');
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (!user || err) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    } else {
      next();
    }
  })(req, res, next);
};

module.exports = auth;
