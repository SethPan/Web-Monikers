const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((user, id, done) => {
      console.log('hi')
      return done(null, userInfo);
    })
  );
  passport.serializeUser((userInfo, callback) => {
    console.log('hi')
    callback(null, userInfo.id);
  });
  passport.deserializeUser((userInfo, callback) => {
    client.query(
      `SELECT id FROM users
      WHERE id = '${userInfo.id}'`,
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
