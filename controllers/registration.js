const Users = require('../models/users');

const post = (req, res) => {
  const { username, surName, firstName, middleName, password } = req.body;

  Users.create(
    { username, surName, firstName, middleName, password },
    (err, doc) => {
      if (err) return console.log(err);
      console.log('Сохранен объект:', doc);
      res.json(doc);
    }
  );
};

module.exports = { post };
