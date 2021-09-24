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

  //HERE HAVE AUTHENTIFICATION OF INPUTS

  //may be incorrect statement syntax for now
  const query = "SELECT password FROM users WHERE email = VALUE";
  const value = [email];
  client.query(query, value, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
    }
    client.end();
  });
}
module.exports = handleLogin;
