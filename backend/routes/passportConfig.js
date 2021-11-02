const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

function passport(username, password) {
passport.use(
    new localStrategy((username, password, done) => {

    })
)
}

module.exports = passport