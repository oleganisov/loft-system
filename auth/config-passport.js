const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/schemas/users');
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

// LocalStrategy
passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    Users.findOne({ _id: payload.id })
      .then((user) => {
        if (!user) {
          console.log('Unauthorized');
          return done(new Error('User not found'));
        }
        return done(null, { id: user.id });
      })
      .catch((err) => done(err));
  })
);
