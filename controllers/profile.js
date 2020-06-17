const Users = require('../models/schemas/users');
const { ErrorHandler } = require('../helpers/error');
const { serializeUser } = require('../helpers/serialize');
const { getUserIdFromToken } = require('../auth/token');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const get = async (req, res, next) => {
  const token = req.headers.authorization;
  const userId = await getUserIdFromToken(token);

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
  const token = req.headers.authorization;
  const userId = await getUserIdFromToken(token);
  const upload = path.join('public', 'upload');
  fs.mkdirSync(upload, { recursive: true });

  const form = formidable({ uploadDir: upload, maxFileSize: 300 * 1024 });

  form.parse(req, (err, fields, file) => {
    if (err) return next(new ErrorHandler(500, err.message));

    const { firstName, middleName, surName, oldPassword, newPassword } = fields;
    const destPath = path.join(upload, file.avatar.name);

    fs.rename(file.avatar.path, destPath, (err) => {
      if (err) return next(new ErrorHandler(500, err.message));
    });
    Users.findByIdAndUpdate(
      userId,
      { $set: { firstName, middleName, surName, image: destPath } },
      { new: true },
      (err, user) => {
        if (err) return next(new ErrorHandler(500, err.message));
        res.json(serializeUser(user));
      }
    );
  });
};

module.exports = { get, patch };
