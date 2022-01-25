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
  console.log("\nhandleLogin running");
  //>---CAN HAVE AUTHENTICATION OF INPUTS HERE---<
  const hashedPassword = await getHashedPassword(res, email, client);
  // console.log("\nhashed Password (in parent function):", hashedPassword);

  await compareHashcodes(res, password, hashedPassword);

  const username = await getUsername(email, client);
  const id = await getId(email, client);
  const user = { username, email, password, id };
  console.log("\nuser (from handleLogin):", user);
  return user;
}

async function getHashedPassword(res, email, client) {
  const resp = await client.query(
    `SELECT password FROM users
  WHERE email = lower('${email}')`
  );
  if (resp.rowCount === 0) {
    return "user does not exist"; //can be handled
  } else {
    const hashedPassword = resp.rows[0].password;
    // console.log("\nhashed password (in function after query):", hashedPassword);
    return hashedPassword;
  }
}

async function getId(email, client) {
  const resp = await client.query(
    `SELECT id FROM users
    WHERE email = lower('${email}')`
  );
  const id = resp.rows[0].id;
  return id;
}

async function getUsername(email, client) {
  const resp = await client.query(
    `SELECT username FROM users WHERE email = lower('${email}')`
  );
  const username = resp.rows[0].username;
  return username;
}

async function compareHashcodes(res, password, hashedPassword) {
  await bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (result === false) {
      console.log("password incorrect (from handleLogin)");
      res.send("password incorrect");
      return "password incorrect";
    }
    if (result === true) {
      console.log("correct password (from handleLogin)");
    }
  });
}

module.exports = handleLogin;
