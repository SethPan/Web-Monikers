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
    `CREATE TABLE IF NOT EXISTS users 
    (username TEXT, 
      password TEXT, 
      id INTEGER, 
      email text)`
  );
  client.query(
    `CREATE TABLE IF NOT EXISTS cards 
    (cardName TEXT, 
      description TEXT, 
      points INTEGER, 
      uploaderId INTEGER, 
      cardset TEXT)`
  );
  client.end();
}
module.exports = prepDb;
