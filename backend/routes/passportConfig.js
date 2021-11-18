const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((user, id, done) => {
      return done(null, user);
    })
  );
  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });
  passport.deserializeUser((id, callback) => {
    callback(err, id);
  });
}

// module.exports = passport;
