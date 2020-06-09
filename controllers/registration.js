const get = (req, res) => {
  res.send('register');
};

const post = (req, res) => {
  const { username, surName, firstName, middleName, password } = req.body;
  console.log(username, surName, firstName, middleName, password);
  res.sendStatus(200);
};

module.exports = { get, post };
