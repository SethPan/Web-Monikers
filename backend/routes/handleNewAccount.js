const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");

async function handleNewAccount(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  console.log("\nhandleNewAccount running \n");
  client.connect();

  //input fields sent from client
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 11);
  const username = req.body.username;
  const uniqueID = await bcrypt.hash(req.body.email.toLowerCase(), 5);

  client.query( //<--- checking for dupe email
    `SELECT email FROM users
  WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle new user error checking db for email provided\n", err);
      } else {
        if (resp.rows[0].email === email) {
          console.log("duplicate email");
          res.send("duplicate email");
        }
        if (resp.rows[0].email !== email) {
          //can check if email is a valid email here

          client.query( //<--checking for dupe username
            `SELECT username FROM user WHERE username = '${username}'`,
            (err, resp) => {
              if (err) {
                console.log(
                  "\nhandle new user error checking db for username provided\n",
                  err
                );
              } else {
                if (resp.rows[0].username === username) {
                  console.log("duplicate username");
                  res.send("duplicate username");
                }
                if (resp.rows[0].username !== username) {
                  client.query( //<---adding to db
                    `INSERT INTO users(username, password, id, email) VALUES ('${username}', '${hashedPassword}', '${uniqueID}', lower('${email}'))`,
                    (err, resp) => {
                      if (err) {
                        console.log("\ninsert into users error\n", err);
                      } else {
                        console.log(resp);
                        resp.send("user added") //<--- add handler for this on front end
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
}

module.exports = handleNewAccount;
