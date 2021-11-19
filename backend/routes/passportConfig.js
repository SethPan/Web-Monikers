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
    client.query(
      `SELECT id FROM users
      WHERE id = '${id}'`,
      (err, resp) => {
        if (err) {
          console.log("error finding user id in db", err)
        } else {
          callback(err, id);
        }
      }
    );
   
  });
}

// module.exports = passport;
