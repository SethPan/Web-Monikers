const { Pool, Client } = require("pg");
//change PASSWORD below, or configure an env
//replace DBNAME with the database name
const connectionString =
  "postgressql://postgres:PASSWORD@localhost:5432/DBNAME";

const client = new Client({
  connectionString: connectionString,
});

client.connect();
client.query("SELECT * from blablablah", (err, res) => {
  console.log(err, res);
  client.end();
});
