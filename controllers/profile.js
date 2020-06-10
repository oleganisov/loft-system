const Users = require('../models/users');

const get = (req, res) => {
  Users.find({}, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};

const patch = (req, res) => {
  const { firstName, middleName, surName, oldPassword, newPassword } = req.body;
  console.log(firstName, middleName, surName, oldPassword, newPassword);
  res.sendStatus(200);
};

module.exports = { get, patch };
