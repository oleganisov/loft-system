const jwt = require('jsonwebtoken');
const { serializeUser } = require('../helpers/serialize');
const { findUserById } = require('../models');
const secret = process.env.SECRET;
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
const getUserFromToken = async (token) => {
  const userId = await getUserIdFromToken(token);
  const user = await findUserById(userId);

  return user;
};

const refreshTokens = async (refreshToken) => {
  const userId = await getUserIdFromToken(refreshToken);
  const user = await findUserById(userId);

  if (user) {
    return {
      ...serializeUser(user),
      ...(await createTokens(user))
    };
  } else {
    return {};
  }
};

module.exports = {
  createTokens,
  getUserIdFromToken,
  getUserFromToken,
  refreshTokens
};
