const News = require('../models/news');

const get = (req, res) => {
  News.find({}, 'title', (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};
const post = (req, res) => {
  const { text, title } = req.body;
  // const news = new News({ title, text });
  News.create({ title, text }, (err, doc) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log('Сохранен объект:', doc);
    res.json(doc);
  });
  // .then((doc) => {
  //   console.log('Сохранен объект:', doc);
  //   res.json(doc);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.sendStatus(400);
  // });
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
