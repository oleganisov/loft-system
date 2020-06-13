const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/schemas/users');
const secret = require('../config/config.json').secret;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

// LocalStrategy
passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
      Users.findOne({ username })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          if (!user.validPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    }
  )
);

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    console.log(payload);
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
