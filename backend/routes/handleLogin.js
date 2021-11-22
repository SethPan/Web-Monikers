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

  const hashedPassword = await getHashedPassword(res, email, client)
  await compareHashcodes(res, password, hashedPassword)

  const username = await getUsername(email, client)
  const id = await getId(email, client)
  const user = { username, email, password, id }
  console.log(user)
  return user
}



async function getId(email, client) {
  await client.query(
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

async function getHashedPassword(res, email, client) {
  await client.query(
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
          return hashedPassword
        }
    } 
  );
}

async function getUsername(email, client) {
  await client.query(
    `SELECT username FROM users WHERE email = lower('${email}')`,
    (err, resp) => {
      if (err) console.log("error retriving username after login", err);
      else {
        username = resp.rows[0].username;
        return username
      }
    }
  );
}

async function compareHashcodes(res, password, hashedPassword) {
  await bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) throw err;
    if (result === false) {
      console.log("password incorrect");
      res.send("password is incorrect");
    }
    if (result === true) {
      console.log("correct password");
      
    }
  });
}

module.exports = handleLogin;
