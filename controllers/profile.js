const { ErrorHandler } = require('../helpers/error');
const { serializeUser } = require('../helpers/serialize');
const { getUserIdFromToken, getUserFromToken } = require('../auth/token');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const { findUserById } = require('../models');

const get = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userId = await getUserIdFromToken(token);
    const user = await findUserById(userId);

    res.json(serializeUser(user));
  } catch (e) {
    return next(new ErrorHandler(401, e.message));
  }
};

const patch = async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await getUserFromToken(token);
  let image;

  const upload = path.join(process.cwd(), 'upload', 'avatar');
  fs.mkdirSync(upload, { recursive: true });

  const form = formidable({ uploadDir: upload, maxFileSize: 300 * 1024 });

  form.parse(req, async (err, fields, file) => {
    if (err) return next(new ErrorHandler(500, err.message));

    const { firstName, middleName, surName, oldPassword, newPassword } = fields;
    if (file.avatar) {
      image = path.join('avatar', file.avatar.name);
      fs.rename(
        file.avatar.path,
        path.join(upload, file.avatar.name),
        (err) => {
          if (err) return next(new ErrorHandler(500, err.message));
        }
      );
    }

    if (newPassword) {
      try {
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
          return next(new ErrorHandler(418, 'Invalid password!'));
        }
        user.password = newPassword;
      } catch (e) {
        return new ErrorHandler(500, e.message);
      }
    }

    user.firstName = firstName;
    user.middleName = middleName;
    user.surName = surName;
    user.image = image || user.image;
    user.save();

    res.json(serializeUser(user));
  });
};

module.exports = { get, patch };
