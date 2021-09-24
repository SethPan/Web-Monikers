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
    (username TEXT UNIQUE NOT NULL, 
      password TEXT NOT NULL, 
      id INTEGER UNIQUE, 
      email TEXT UNIQUE NOT NULL)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err.stack);
      } else {
        //console.log(resp);
      }
    }
  );

  client.query(
    `UPDATE TABLE users 
    (username TEXT UNIQUE NOT NULL, 
      password TEXT NOT NULL, 
      id INTEGER UNIQUE, 
      email TEXT UNIQUE NOT NULL)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err.stack);
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
    `INSERT INTO users (username, password, id, email) VALUES (Seth, password, 1, stpanousis@comcast.net)`,
    (err, resp) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(resp.rows[0]);
      }
    }
  );

  client.query(
    `CREATE TABLE IF NOT EXISTS cards 
    (cardName TEXT DEFAULT null, 
      description TEXT DEFAULT null, 
      points INTEGER DEFAULT null, 
      uploaderId INTEGER DEFAULT null, 
      cardset TEXT DEFAULT null,)`,
    (err, resp) => {
      if (err) {
        console.log("\n\n", err.stack);
      } else {
        //console.log(resp);
      }
      client.end();
    }
  );
}
module.exports = prepDb;
