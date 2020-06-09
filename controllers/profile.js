const get = (req, res) => {
  res.send('profile');
};

const patch = (req, res) => {
  const { firstName, middleName, surName, oldPassword, newPassword } = req.body;
  console.log(firstName, middleName, surName, oldPassword, newPassword);
  res.sendStatus(200);
};

module.exports = { get, patch };
