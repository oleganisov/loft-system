const jwt = require('jsonwebtoken');
const secret = require('../config/config.json').secret;

const createTokens = async (user) => {
  const accessToken = await jwt.sign(
    {
      id: user._id
    },
    secret,
    {
      expiresIn: '60m'
    }
  );
  const refreshToken = await jwt.sign(
    {
      id: user._id
    },
    secret,
    {
      expiresIn: '8h'
    }
  );
  const accessTokenExpiredAt = jwt.verify(accessToken, secret);
  const refreshTokenExpiredAt = jwt.verify(refreshToken, secret);

  return {
    accessToken,
    refreshToken,
    accessTokenExpiredAt,
    refreshTokenExpiredAt
  };
};

const getUserIdFromToken = async (token) => {
  const userId = jwt.verify(token, secret).id;

  return userId;
};

module.exports = {
  createTokens,
  getUserIdFromToken
};
