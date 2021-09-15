const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";
const client = new Client({
  connectionString: connectionString,
});

async function handleLogin(req, res) {
  console.log("handleLogin running \n\n");

  client.connect();
  client.query(
    "CREATE TABLE IF NOT EXISTS users (username text, password text, id integer, email text)"
  );
  client.query(
    "CREATE TABLE IF NOT EXISTS cards (cardName text, description text, points integer, uploaderId integer)"
  );
  await client.query("SELECT * FROM cards", (err, resp) => {
    console.log("\nerr: \n", err, "\n\n res: \n", resp);
  });
  await client.end();
}
module.exports = handleLogin;
