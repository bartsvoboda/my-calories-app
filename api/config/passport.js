const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/user.model');

require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  User.findById({ _id: payload.userId })
  .then(res => {
    console.log(res);
    next(null, res);
  });
});

passport.use(strategy);

module.exports = passport;