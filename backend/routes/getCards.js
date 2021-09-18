const { Pool, Client } = require("pg");
const connectionString =
  "postgressql://postgres:password@localhost:5432/WebMonikers";

function getCards(req, res) {
  const client = new Client({
    connectionString: connectionString,
  });
  client.connect();
  console.log("\ngetCards running \n");

  client.query("SELECT * FROM cards", (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      console.log(resp);
    }
    client.end();
  });
}

module.exports = getCards;
