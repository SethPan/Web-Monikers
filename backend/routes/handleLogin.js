const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");

function handleLogin(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  console.log("\nhandleLogin running \n");
  client.connect();

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
        if (resp.rows[0].password === hashedPassword) {
          console.log("query passed");
          //return from function here
        }
      }
    }
  );
}
module.exports = handleLogin;
