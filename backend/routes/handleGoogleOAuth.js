const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

const GOOGLE_CONSUMER_KEY = process.env.GOOGLE_CONSUMER_KEY;
const GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CONSUMER_SECRET;

function handleGoogleOAuth(req, res) {
  passport.use(
    new GoogleStrategy(
      {
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );
}

module.exports = handleGoogleOAuth;
