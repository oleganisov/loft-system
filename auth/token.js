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
  console.log(token, user._id, secret);
  return token;
};

module.exports = {
  createToken
};
