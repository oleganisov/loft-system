const post = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.sendStatus(200);
};

module.exports = { post };
