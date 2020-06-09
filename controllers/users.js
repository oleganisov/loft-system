const get = (req, res) => {
  res.send('users');
};

const del = (req, res) => {
  console.log(req.params.id);
  res.sendStatus(200);
};

const patch = (req, res) => {
  const { permission } = req.body;
  console.log(permission, req.params.id);
  res.sendStatus(200);
};

module.exports = { get, del, patch };
