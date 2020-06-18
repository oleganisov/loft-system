// const passport = require('passport');
const { ErrorHandler } = require('../helpers/error');
const { getUserFromToken } = require('./token');

// const auth = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (!user || err) {
//       return next(new ErrorHandler(401, 'Unauthorized'));
//     } else {
//       next();
//     }
//   })(req, res, next);
// };
const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const user = await getUserFromToken(token);
    if (!user) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    } else {
      next();
    }
  } catch (e) {
    return next(new ErrorHandler(401, e.message));
  }
};

module.exports = auth;
