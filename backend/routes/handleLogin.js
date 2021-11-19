const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");

async function handleLogin(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  client.connect();
  console.log("\nhandleLogin running \n");

  //input fields sent from client
  const email = req.body.email;
  const password = req.body.password;

  //HERE HAVE AUTHENTICATION OF INPUTS

  await client.query(
    `SELECT password FROM users
  WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle login error\n", err);
      } else {
        bcrypt.compare(password, resp.rows[0].password, (err, result) => {
          if (err) throw err;
          if (result === false) {
            console.log("query failed");
            res.send("no user exists");
          }
          if (result === true) {
            console.log("query passed");
            client.query(
              `SELECT id FROM users
              WHERE email = lower('${email}')`,
              (err, resp) => {
                if (err) {
                  console.log("error finding user id in db", err);
                } else {
                  const id = resp.rows[0].id;

                  client.query(
                    `SELECT username FROM users WHERE email = lower('${email}')`,
                    (err, resp) => {
                      if (err) console.log("error retriving username after login", err);
                      else {
                        username = resp.rows[0].username;
                        const user = { username, email, password, id };
                        return user;
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
}
module.exports = handleLogin;
