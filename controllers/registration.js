const Users = require('../models/schemas/users');
const { ErrorHandler } = require('../helpers/error');
const secret = require('../config/config.json').secret;
const passport = require('passport');
const { createToken } = require('../auth/token');
const { createUser } = require('../models');

const post = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));
    const { username, surName, firstName, middleName, password } = req.body;

    Users.findOne({ username }, async (err, user) => {
      if (err) return next(new ErrorHandler(500, 'Internal server error'));
      if (user) {
        return next(new ErrorHandler(400, 'Username is already in use'));
      }
      try {
        const newUser = await createUser({
          username,
          surName,
          firstName,
          middleName,
          password
        });
        const token = await createToken(newUser, secret);
        res.json({
          statusMessage: 'Ok',
          data: {
            // ...newUser,
            token: token
          }
        });
      } catch (e) {
        return next(new ErrorHandler(500, e.message));
      }
    });
  })(req, res, next);
};

module.exports = { post };
