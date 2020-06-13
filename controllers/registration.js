const Users = require('../models/users');
const { ErrorHandler } = require('../helpers/error');

const post = (req, res, next) => {
  const { username, surName, firstName, middleName, password } = req.body;

  Users.findOne({ username }, (err, user) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));
    if (user) {
      return next(new ErrorHandler(400, 'Username is already in use'));
    }

    const newUser = new Users({
      username,
      surName,
      firstName,
      middleName,
      image: '',
      permission: {
        chat: { C: true, R: true, U: true, D: true },
        news: { C: true, R: true, U: true, D: true },
        settings: { C: true, R: true, U: true, D: true }
      }
    });
    newUser.setPassword(password);
    newUser.save((err, user) => {
      if (err) return next(new ErrorHandler(500, 'Internal server error'));
      console.log('User created!', user);
      res.json(user);
    });
  });
};

module.exports = { post };
