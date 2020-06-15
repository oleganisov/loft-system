const Users = require('../models/schemas/users');
const { ErrorHandler } = require('../helpers/error');
const { getUserIdFromToken } = require('../auth/token');

const get = async (req, res, next) => {
  const token = req.headers.authorization;
  const userId = await getUserIdFromToken(token.replace('Bearer ', ''));
  console.log(userId);
  Users.findById(
    userId,
    'surName firstName middleName username image permission',
    (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      res.json(doc);
    }
  );
};

const patch = async (req, res, next) => {
  const { firstName, middleName, surName, oldPassword, newPassword } = req.body;
  const token = req.headers.authorization;
  const userId = await getUserIdFromToken(token.replace('Bearer ', ''));
  console.log(firstName, middleName, surName, oldPassword, newPassword, userId);
  Users.findByIdAndUpdate(
    userId,
    { $set: { firstName, middleName, surName } },
    { new: true },
    (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      res.json(doc);
    }
  );
};

module.exports = { get, patch };
