const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/config.json').secret;
const { ErrorHandler, handleError } = require('../helpers/error');

const post = (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ username }, (err, user) => {
    if (err) return console.log(err);

    if (!user) {
      const error = new ErrorHandler(400, 'User not found');
      return handleError(error, res);
    }
    res.json(user);
  });
};

module.exports = { post };
