const News = require('../models/news');

const get = (req, res) => {
  News.find({}, (err, doc) => {
    if (err) return console.log(err);
    res.json(doc);
  });
};
const post = (req, res) => {
  const { text, title } = req.body;

  News.create({ title, text }, (err, doc) => {
    if (err) return console.log(err);
    console.log('Сохранен объект:', doc);

    News.find({}, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc);
    });
  });
};
const patch = (req, res) => {
  const { text, title } = req.body;

  News.findByIdAndUpdate(
    req.params.id,
    { $set: { title, text } },
    (err, doc) => {
      if (err) return console.log(err);
      News.find({}, (err, doc) => {
        if (err) return console.log(err);
        res.json(doc);
      });
    }
  );
};

const del = (req, res) => {
  News.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return console.log(err);
    News.find({}, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc);
    });
  });
};

module.exports = { get, post, patch, del };
