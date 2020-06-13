const News = require('../models/schemas/news');
const { ErrorHandler } = require('../helpers/error');

const get = (req, res, next) => {
  News.find({}, (err, doc) => {
    if (err) return next(new ErrorHandler(500, err.message));
    res.json(doc);
  });
};
const post = (req, res, next) => {
  const { text, title } = req.body;

  News.create({ title, text }, (err, doc) => {
    if (err) return next(new ErrorHandler(500, err.message));
    console.log('Сохранен объект:', doc);

    News.find({}, (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      res.json(doc);
    });
  });
};
const patch = (req, res, next) => {
  const { text, title } = req.body;

  News.findByIdAndUpdate(
    req.params.id,
    { $set: { title, text } },
    (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      News.find({}, (err, doc) => {
        if (err) return next(new ErrorHandler(500, err.message));
        res.json(doc);
      });
    }
  );
};

const del = (req, res, next) => {
  News.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) return next(new ErrorHandler(500, err.message));
    News.find({}, (err, doc) => {
      if (err) return next(new ErrorHandler(500, err.message));
      res.json(doc);
    });
  });
};

module.exports = { get, post, patch, del };
