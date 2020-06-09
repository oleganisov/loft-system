const post = (req, res) => {
  console.log(req.headers.authorization);
  res.sendStatus(200);
};

module.exports = { post };
