const Users = require('../models/schemas/users');
const { ErrorHandler } = require('../helpers/error');
const secret = require('../config/config.json').secret;
const passport = require('passport');
const { createToken } = require('../auth/token');

const post = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));
    const { username, surName, firstName, middleName, password } = req.body;

    Users.findOne({ username }, (err, user) => {
      if (err) return next(new ErrorHandler(500, 'Internal server error'));
      if (user) {
        return next(new ErrorHandler(400, 'Username is already in use'));
      }

      const newUser = new Users({
        username,
        surName,
        firstName,
        middleName,
        image: '',
        permission: {
          chat: { C: true, R: true, U: true, D: true },
          news: { C: true, R: true, U: true, D: true },
          settings: { C: true, R: true, U: true, D: true }
        }
      });
      newUser.setPassword(password);
      newUser.save(async (err, user) => {
        if (err) return next(new ErrorHandler(500, 'Internal server error'));
        if (user) {
          console.log(user, secret);
          const token = await createToken(user, secret);
          res.json({
            statusMessage: 'Ok',
            data: {
              token: token
            }
          });
          console.log('User created!', user);
        }
      });
    });
  })(req, res, next);
};

module.exports = { post };
