const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/config.json').secret;

const post = (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ username, password }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};

module.exports = { post };
