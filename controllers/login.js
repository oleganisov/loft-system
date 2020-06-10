const Users = require('../models/users');

const post = (req, res) => {
  const { username, password } = req.body;

  Users.findOne({ username, password }, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};

module.exports = { post };
