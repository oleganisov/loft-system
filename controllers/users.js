const Users = require('../models/users');

const get = (req, res) => {
  Users.find({}, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};

const del = (req, res) => {
  Users.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};

const patch = (req, res) => {
  const { permission } = req.body;
  console.log(permission, req.params.id);
  res.sendStatus(200);
};

module.exports = { get, del, patch };
