const Users = require('../models/schemas/users');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/config.json').secret;
const { ErrorHandler } = require('../helpers/error');

const post = (req, res, next) => {
  const { username, password } = req.body;

  // passport.authenticate('local', { session: false }, (err, user, info) => {});

  Users.findOne({ username }, (err, user) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));

    if (!user) {
      return next(new ErrorHandler(400, 'User not found'));
    }
    res.json(user);
  });
};

module.exports = { post };
