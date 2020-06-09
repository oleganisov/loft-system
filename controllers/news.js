const get = (req, res) => {
  res.send('news');
};
const post = (req, res) => {
  const { text, title } = req.body;
  console.log(text, title);
  res.sendStatus(200);
};
const patch = (req, res) => {
  const { text, title } = req.body;
  console.log(text, title, req.params.id);
  res.sendStatus(200);
};
const del = (req, res) => {
  console.log(req.params.id);
  res.sendStatus(200);
};

module.exports = { get, post, patch, del };
