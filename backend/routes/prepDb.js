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
    (username TEXT DEFAULT null, 
      password TEXT DEFAULT null, 
      id INTEGER DEFAULT null, 
      email TEXT DEFAULT null)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err);
      } else {
        //console.log(resp);
      }
    }
  );

  // //test
  // client.query(`SELECT password FROM users`, (err, resp) => {
  //   if (err) {
  //     console.log("\n\n", err);
  //   } else {
  //     console.log(resp);
  //   }
  // });

  client.query(
    `CREATE TABLE IF NOT EXISTS cards 
    (cardName TEXT DEFAULT null, 
      description TEXT DEFAULT null, 
      points INTEGER DEFAULT null, 
      uploaderId INTEGER DEFAULT null, 
      cardset TEXT DEFAULT null)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err);
      } else {
        //console.log(resp);
      }
      client.end();
    }
  );
}
module.exports = prepDb;
