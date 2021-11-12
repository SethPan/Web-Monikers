const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");

async function prepDb() {
  const hashedTestPassword = await bcrypt.hash('password', 11);
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
        console.log("\ncreate table users error\n", err);
      } else {
        //console.log(resp);
      }
    }
  );

  client.query(
    `CREATE TABLE IF NOT EXISTS cards
    (name TEXT UNIQUE NOT NULL, 
      text TEXT , 
      points INTEGER)`,
    (err, resp) => {
      if (err) {
        console.log("\ncreate table cards error\n", err);
      } else {
        //console.log(resp);
      }
    }
  );

  client.query(
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS
    username TEXT UNIQUE NOT NULL, 
    ADD COLUMN IF NOT EXISTS password TEXT NOT NULL, 
    ADD COLUMN IF NOT EXISTS id INTEGER UNIQUE, 
    ADD COLUMN IF NOT EXISTS email TEXT UNIQUE NOT NULL`,
    (err, resp) => {
      if (err) {
        console.log("\nalter table users error\n", err);
      } else {
        //console.log(resp);
      }
    }
  );

  // //use to manually add columns easily in testing
  // client.query(
  //   `INSERT INTO users(username, password, id, email) VALUES ('Seth', 'password', 1, lower('${stpanousis@comcast.net}'))`,
  //   (err, resp) => {
  //     if (err) {
  //       console.log("\ninsert into users error\n", err);
  //     } else {
  //       console.log(resp);
  //     }
  //   }
  // );

  //update password to hashed salted version
  client.query(
    `UPDATE users 
    SET password = '${hashedTestPassword}'
    WHERE email = 'stpanousis@comcast.net'`
  )

  //test to be used as password check
  client.query(
    `SELECT password FROM users
    WHERE email = 'stpanousis@comcast.net'`,
    (err, resp) => {
      if (err) {
        console.log("\nselect password from users where... error\n", err);
      } else {
        console.log(resp.rows[0].password);
      }
    }
  );

  client.query(
    `CREATE TABLE IF NOT EXISTS cards
    (cardName TEXT DEFAULT null, 
      description TEXT DEFAULT null, 
      points INTEGER DEFAULT null, 
      uploaderId INTEGER DEFAULT null, 
      cardset TEXT DEFAULT null)`,
    (err, resp) => {
      if (err) {
        console.log("\ncreate table cards error\n", err.stack);
      } else {
        //console.log(resp);
      }
      client.end();
    }
  );
}
module.exports = prepDb;
