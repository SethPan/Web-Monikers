const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";
const client = new Client({
  connectionString: connectionString,
});

function handleLogin(req, res) {
  client.connect();
  client.query(
    "CREATE TABLE IF NOT EXISTS users (username text, password text, id integer, email text)"
  );
  client.query(
    "CREATE TABLE IF NOT EXISTS cards (cardName text, description text, points integer, uploaderId integer)"
  );
  client.query("SELECT * from cards", (err, res) => {
    console.log("err: \n", err, "\n\n\n\n res: \n", res);
  });
  client.end();
}

export default handleLogin;
