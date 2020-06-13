const jwt = require('jsonwebtoken');

const createTokens = async (user, secret) => {
  const accessToken = await jwt.sign(
    {
      id: user._id
    },
    secret,
    {
      expiresIn: '10m'
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

module.exports = {
  createTokens
};
