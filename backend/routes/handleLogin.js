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
module.exports = handleLogin;
