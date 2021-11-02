const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");

function handleNewAccount(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  console.log("\nhandleNewAccount running \n");
  client.connect();

  //input fields sent from client
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const username = req.body.username;

  function generateId() {}

  client.query(
    `SELECT email FROM users
  WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle login error\n", err);
      } else {
        if (resp.rows[0].email === email) {
          console.log("dupe");
          res.send("duplicate");
        }
        if (resp.rows[0].email !== email) {
          //check if email is a valid email
          //add a genorator to assign an id number to users, or get rid of id number
          client.query(
            `INSERT INTO users(username, password, id, email) VALUES ('${username}', '${hashedPassword}', '${generateId()}', lower('${email}'))`,
            (err, resp) => {
              if (err) {
                console.log("\ninsert into users error\n", err);
              } else {
                console.log(resp);
              }
            }
          );
        }
      }
    }
  );
}

module.exports = handleNewAccount;
