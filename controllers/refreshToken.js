const { ErrorHandler } = require('../helpers/error');
const { refreshTokens } = require('../auth/token');

const post = async (req, res, next) => {
  try {
    const refreshToken = req.headers.authorization;
    const data = await refreshTokens(refreshToken);

    res.json({ ...data });
  } catch (e) {
    return next(new ErrorHandler(401, e.message));
  }
};

module.exports = { post };
