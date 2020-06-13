const { ErrorHandler } = require('../helpers/error');
const { serializeUser } = require('../helpers/serialize');
const secret = require('../config/config.json').secret;
const { createToken } = require('../auth/token');
const { createUser, findUserByName } = require('../models');

const post = async (req, res, next) => {
  const { username, surName, firstName, middleName, password } = req.body;
  const user = await findUserByName(username);

  if (user) {
    return next(new ErrorHandler(400, 'Username is already in use'));
  }
  try {
    const newUser = await createUser({
      username,
      surName,
      firstName,
      middleName,
      password
    });
    const token = await createToken(newUser, secret);
    res.json({
      status: 'Ok',
      statusCode: 200,
      data: {
        ...serializeUser(newUser),
        token: token
      }
    });
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

module.exports = { post };
