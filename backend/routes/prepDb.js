const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";

function prepDb() {
  const client = new Client({
    connectionString: connectionString,
  });
  client.connect();
  console.log("\nprepDb running\n");

  client.query(
    `CREATE TABLE IF NOT EXISTS users 
    (username TEXT, 
      password TEXT, 
      id INTEGER, 
      email text)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err);
      } else {
        console.log(resp);
      }
    }
  );

  client.query(
    `CREATE TABLE IF NOT EXISTS cards 
    (cardName TEXT, 
      description TEXT, 
      points INTEGER, 
      uploaderId INTEGER, 
      cardset TEXT)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err);
      } else {
        console.log(resp);
      }
      client.end();
    }
  );
}
module.exports = prepDb;
