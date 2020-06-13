const passport = require('passport');
const secret = require('../config/config.json').secret;
const { createTokens } = require('../auth/token');
const { ErrorHandler } = require('../helpers/error');
const { serializeUser } = require('../helpers/serialize');

const post = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      if (err) return next(new ErrorHandler(500, err.message));

      if (!user) {
        return next(new ErrorHandler(400, 'User not found'));
      }
      if (user) {
        const tokens = await createTokens(user, secret);
        res.json({
          status: 'Ok',
          statusCode: 200,
          data: {
            ...serializeUser(user),
            ...tokens
          }
        });
      }
    }
  )(req, res, next);
};

module.exports = { post };
