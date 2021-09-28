const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

const { Pool, Client } = require("pg");
const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";

function handleLogin(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  console.log("\nhandleLogin running \n");
  client.connect();

  const email = req.body.email;
  const password = req.body.password;

  //HERE HAVE AUTHENTICATION OF INPUTS

  client.query(
    `SELECT password FROM users
  WHERE email = ${email}`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle login error\n", err);
      } else {
        if (resp.rows[0].password === password) {
        }
      }
    }
  );

  passport.use(
    new GoogleStrategy(
      {
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );
}
module.exports = handleLogin;
