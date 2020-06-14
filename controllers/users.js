const Users = require('../models/schemas/users');
const { ErrorHandler } = require('../helpers/error');

const get = (req, res, next) => {
  Users.find(
    {},
    'surName firstName middleName username image permission',
    (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      res.json(doc);
    }
  );
};

const del = (req, res, next) => {
  Users.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return next(new ErrorHandler(500, err.message));
    res.json(doc);
  });
};

const patch = (req, res, next) => {
  const { permission } = req.body;

  Users.findByIdAndUpdate(
    req.params.id,
    { $set: { permission } },
    {
      new: true,
      select: 'surName firstName middleName username image permission'
    },
    (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      res.json(doc);
    }
  );
};

module.exports = { get, del, patch };
