const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const token = process.env.GOOGLE_CONSUMER_KEY;
const tokenSecret = process.env.GOOGLE_CONSUMER_SECRET;

function handleGoogleOAuth(req, res) {
  console.log("handle google oauth running");
  console.log(req.body);
  passport.use(
    new GoogleStrategy(
      {
        clientID: token,
        clientSecret: tokenSecret,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          console.log("\nerr:\n", err);
          console.log("\nuser:\n", user);
          return done(err, user);
        });
      }
    )
  );
}
module.exports = handleGoogleOAuth;
