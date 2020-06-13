const jwt = require('jsonwebtoken');

const createToken = async (user, secret) => {
  const token = await jwt.sign(
    {
      id: user._id
    },
    secret,
    {
      expiresIn: '10m'
    }
  );

  return token;
};

module.exports = {
  createToken
};
