const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";

function handleLogin(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  console.log("handleLogin running \n\n");
  client.connect();

  const email = req.body.email;
  const password = req.body.password;

  client.query("SELECT * FROM users", (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
    }
    client.end();
  });
}
module.exports = handleLogin;
