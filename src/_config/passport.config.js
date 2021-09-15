const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, done);
    })
    .catch((err) => {
      done(err);
    });
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userID, done) => {
  User.findById(userID)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
