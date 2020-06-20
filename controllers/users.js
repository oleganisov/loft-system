const { ErrorHandler } = require('../helpers/error');
const {
  findUsers,
  findUserByIdAndDelete,
  findUserByIdAndUpdate
} = require('../models');

const get = async (req, res, next) => {
  try {
    const users = await findUsers();

    res.json(users);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

const del = async (req, res, next) => {
  try {
    const user = await findUserByIdAndDelete(req.params.id);

    res.json(user);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

const patch = async (req, res, next) => {
  try {
    const { permission } = req.body;
    const user = await findUserByIdAndUpdate(req.params.id, permission);

    res.json(user);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

module.exports = { get, del, patch };
