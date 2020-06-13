const Users = require('../models/users');
const { ErrorHandler, handleError } = require('../helpers/error');

const post = (req, res) => {
  const { username, surName, firstName, middleName, password } = req.body;

  Users.findOne({ username }, (err, user) => {
    if (err) return console.log(err);
    if (user) {
      const error = new ErrorHandler(400, 'username is already in use');
      return handleError(error, res);
    }

    const adminUser = new Users({ username, surName, firstName, middleName });
    adminUser.setPassword(password);
    adminUser.save((err, user) => {
      if (err) return console.log(err);
      console.log('User created!', user);
      res.json(user);
    });
  });
};

module.exports = { post };
