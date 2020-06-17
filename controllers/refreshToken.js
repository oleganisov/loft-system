const { refreshTokens } = require('../auth/token');

const post = async (req, res) => {
  const refreshToken = req.headers.authorization;
  const data = await refreshTokens(refreshToken);

  res.json({ ...data });
};

module.exports = { post };
