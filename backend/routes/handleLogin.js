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
  console.log(email, "\n", password);

  //HERE HAVE AUTHENTICATION OF INPUTS

  //this query searches for the part of the email leading up to the @ symbol
  //but nothing after the @ symbol. read docs on querying emails
  client.query(
    `SELECT password FROM users
  WHERE email = ${email}`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle login error\n", err);
      } else {
        if (resp.rows[0].password === password) {
          console.log("query passed");
        }
      }
    }
  );
}
module.exports = handleLogin;
