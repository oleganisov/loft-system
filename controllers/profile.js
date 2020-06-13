const Users = require('../models/schemas/users');
const { ErrorHandler } = require('../helpers/error');

const get = (req, res, next) => {
  Users.find({}, (err, doc) => {
    if (err) return next(new ErrorHandler(500, err.message));
    res.json(doc);
  });
};

const patch = (req, res) => {
  const { firstName, middleName, surName, oldPassword, newPassword } = req.body;
  console.log(firstName, middleName, surName, oldPassword, newPassword);
  res.sendStatus(200);
};

module.exports = { get, patch };
