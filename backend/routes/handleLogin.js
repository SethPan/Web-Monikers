const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");
const passport = require("./passportConfig.js")

async function handleLogin(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  client.connect();
  console.log("\nhandleLogin running \n");

  //input fields sent from client
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 11)
  // console.log(email, "\n", password);

  //HERE HAVE AUTHENTICATION OF INPUTS

  client.query(
    `SELECT password FROM users
  WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle login error\n", err);
      } else {
        console.log(resp.rows[0].password, hashedPassword)
        if (resp.rows[0].password !== hashedPassword) {
          res.send('no user exists')
        }
        if (resp.rows[0].password === hashedPassword) {
          console.log("query passed");
          client.query(
            `SELECT id FROM users
            WHERE email = lower('${email}')`,
            (err, resp) => {
              if (err) {
                console.log("error finding user id in db", err)
              } else {
                const id = resp.rows[0].id
                const user = {email, password, id}
                passport.authenticate("local", (err, id) => {
                  if (err) throw err;
                  if (!id) res.send("no user exists")
                  else {
                    client.query(
                      `SELECT username FROM users WHERE email = lower('${email}')`, (err, resp) => {
                        if (err) console.log('error retriving username after login', err)
                        else {
                          username = resp.rows[0].username
                          console.log(`${username} logged in`)
                          res.send("successfully authenticated")
                        }
                      }
                    )
                  }
                })
              }
            }
          );
        }
      }
    }
  );
}
module.exports = handleLogin;
