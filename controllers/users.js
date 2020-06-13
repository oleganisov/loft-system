const Users = require('../models/users');
const { ErrorHandler } = require('../helpers/error');

const get = (req, res, next) => {
  Users.find({}, (err, doc) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));
    res.json(doc);
  });
};

const del = (req, res, next) => {
  Users.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));
    res.json(doc);
  });
};

const patch = (req, res) => {
  const { permission } = req.body;
  console.log(permission, req.params.id);
  res.sendStatus(200);
};

module.exports = { get, del, patch };
