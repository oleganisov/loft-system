const Users = require('../models/users');
const { ErrorHandler } = require('../helpers/error');
const secret = require('../config/config.json').secret;
const jwt = require('jsonwebtoken');
const passport = require('passport');

const post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
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
      newUser.save((err, user) => {
        if (err) return next(new ErrorHandler(500, 'Internal server error'));
        if (user) {
          const token = jwt.sign(
            {
              id: user.id
            },
            secret,
            {
              expiresIn: '10m'
            }
          );
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
