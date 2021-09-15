const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";
const client = new Client({
  connectionString: connectionString,
});

function handleLogin(req, res) {
  console.log("hi");

  client.connect();
  client.query(
    "CREATE TABLE IF NOT EXISTS users (username text, password text, id integer, email text)"
  );
  client.query(
    "CREATE TABLE IF NOT EXISTS cards (cardName text, description text, points integer, uploaderId integer)"
  );
  client.query("SELECT * FROM cards", (err, resp) => {
    console.log("err: \n", err, "\n\n\n\n res: \n", resp);
  });
}
exports.handleLogin = handleLogin();
