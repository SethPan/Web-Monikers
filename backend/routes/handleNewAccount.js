const { Pool, Client } = require("pg");

const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";

function handleNewAccount() {
  const client = new Client({
    connectionString: connectionString,
  });
  console.log("\nhandleNewAccount running \n");
  client.connect();
}

module.exports = handleNewAccount;
