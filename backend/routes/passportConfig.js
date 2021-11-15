const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

function passport(email, password, id) {
  const user = { email, password, id};
  passport.use(
    new localStrategy((email, password, done) => {
      return done(null, user);
    })
  );
  passport.serializeUser((user, callback) => {
      callback(null, user.id)
  });
  passport.deserializeUser((id, callback) => {

  })
}

module.exports = passport;
