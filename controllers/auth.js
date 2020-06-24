const { ErrorHandler } = require('../helpers/error');
const passport = require('passport');
const { serializeUser } = require('../helpers/serialize');
const { createTokens, refreshTokens } = require('../auth/token');
const { createUser, findUserByName } = require('../models');

const registration = async (req, res, next) => {
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
    const tokens = await createTokens(newUser);
    res.json({
      status: 'Ok',
      statusCode: 200,
      data: {
        ...serializeUser(newUser),
        ...tokens
      }
    });
  } catch (e) {
    return next(new ErrorHandler(500, e.message));
  }
};

const login = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      if (err) return next(new ErrorHandler(500, err.message));

      if (!user) {
        return next(new ErrorHandler(400, 'User not found'));
      }
      if (user) {
        const tokens = await createTokens(user);
        res.send({
          ...serializeUser(user),
          ...tokens
        });
      }
    }
  )(req, res, next);
};

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.headers.authorization;
    const data = await refreshTokens(refreshToken);

    res.json({ ...data });
  } catch (e) {
    return next(new ErrorHandler(401, e.message));
  }
};

module.exports = { registration, login, refreshToken };
