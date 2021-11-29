const { Pool, Client } = require("pg");
const connectionString = "postgressql://postgres:password@localhost:5432/webmonikers";
const bcrypt = require("bcryptjs");



async function handleLogin(req, res) {
  //input fields sent from client
  const email = req.body.email;
  const password = req.body.password;

  const client = new Client({
    connectionString: connectionString,
  });
  client.connect();
  console.log("\nhandleLogin running \n");

  //CAN HAVE AUTHENTICATION OF INPUTS HERE

  const hashedPassword = getHashedPassword(res, email, client)
  console.log("\nhashedPassword:", hashedPassword)
  // compareHashcodes(res, password, hashedPassword)

  const username = getUsername(email, client)
  const id = getId(email, client)
  const user = { username, email, password, id }
  console.log("\nuser:", user)
  return user
}



function getId(email, client) {
  client.query(
    `SELECT id FROM users
    WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) {
        console.log("error finding user id in db", err);
      } else {
        const id = resp.rows[0].id;
        return id
      }
    }
  );
}

function getHashedPassword(res, email, client) {
  client.query(
    `SELECT password FROM users
  WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) {
        console.log("\nhandle login error\n", err);
        throw err;
      } if (resp.rowCount === 0) {
          res.send('user does not exist')
          return
        } else {
          const hashedPassword = resp.rows[0].password
          // console.log("\nhashed password:", hashedPassword)
          return hashedPassword
        }
    } 
  );
}

function getUsername(email, client) {
  client.query(
    `SELECT username FROM users WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) console.log("error retriving username after login", err);
      else {
        const username = resp.rows[0].username;
        return username
      }
    }
  );
}

async function compareHashcodes(res, password, hashedPassword) {
  await bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.log(err)
      throw err;
    }
    if (result === false) {
      console.log("password incorrect");
      res.send("password is incorrect");
      return "password is incorrect"
    }
    if (result === true) {
      console.log("correct password");
      return "correct password"
    }
  });
}

module.exports = handleLogin;
