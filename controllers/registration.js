const Users = require('../models/users');
const { ErrorHandler } = require('../helpers/error');

const post = (req, res, next) => {
  const { username, surName, firstName, middleName, password } = req.body;

  Users.findOne({ username }, (err, user) => {
    if (err) return next(new ErrorHandler(500, 'Internal server error'));
    if (user) {
      return next(new ErrorHandler(400, 'Username is already in use'));
    }

    const adminUser = new Users({ username, surName, firstName, middleName });
    adminUser.setPassword(password);
    adminUser.save((err, user) => {
      if (err) return next(new ErrorHandler(500, 'Internal server error'));
      console.log('User created!', user);
      res.json(user);
    });
  });
};

module.exports = { post };
