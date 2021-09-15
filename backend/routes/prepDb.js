const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";
const client = new Client({
  connectionString: connectionString,
});

function prepDb(req, res) {
  console.log("\nprepDb running\n");

  client.connect();
  client.query(
    "CREATE TABLE IF NOT EXISTS users (username text, password text, id integer, email text)"
  );
  client.query(
    "CREATE TABLE IF NOT EXISTS cards (cardName text, description text, points integer, uploaderId integer)"
  );
  client.end();
}
module.exports = prepDb;
