const { ErrorHandler } = require('../helpers/error');
const { getUserIdFromToken } = require('../auth/token');
const {
  findNews,
  createNews,
  findNewsByIdAndUpdate,
  findNewsByIdAndDelete
} = require('../models');

const get = async (req, res, next) => {
  try {
    const news = await findNews();

    res.json(news);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

const post = async (req, res, next) => {
  try {
    const { text, title } = req.body;
    const token = req.headers.authorization;
    const userId = await getUserIdFromToken(token);
    await createNews({ title, text, user: userId });
    const news = await findNews();

    res.json(news);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

const patch = async (req, res, next) => {
  const { text, title } = req.body;
  try {
    await findNewsByIdAndUpdate({ id: req.params.id, title, text });
    const news = await findNews();

    res.json(news);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

const del = async (req, res, next) => {
  try {
    await findNewsByIdAndDelete(req.params.id);
    const news = await findNews();

    res.json(news);
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

module.exports = { get, post, patch, del };
