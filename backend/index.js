const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3050;
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

const users = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let iterator = 1;

  if (!users[ip]) {
    users[ip] = "no team";
  } else {
    newIp = ip.concat(".", iterator);
    users[newIp] = "no team";
    iterator++;
  }
  console.log(users);
});

const cards = [
  { title: 1, description: 1, value: 1 },
  { title: 2, description: 2, value: 2 },
  { title: 3, description: 3, value: 3 },
  { title: 4, description: 4, value: 4 },
  { title: 5, description: 5, value: 5 },
  { title: 6, description: 6, value: 6 },
  { title: 7, description: 7, value: 7 },
  { title: 8, description: 8, value: 8 },
];
let cardIndex = 0;
let gameActive = false;
let removedCards = [];
let points = 0;

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    if (gameActive) {
      io.emit("chat message", msg);
    } else {
      io.emit("chat message", "The game has not started yet.");
    }
  });

  socket.on("start game", () => {
    io.emit("start game");
    gameActive = true;
    io.emit("new card", cards[cardIndex]);
  });

  socket.on("new card", () => {
    cardIndex++;
    if (gameActive) {
      if (cardIndex > cards.length - 1) {
        cardIndex = 0;
      }
      while (removedCards.includes(cardIndex)) {
        cardIndex++;
        if (cardIndex > cards.length - 1) {
          cardIndex = 0;
        }
      }

      io.emit("new card", cards[cardIndex]);
      io.emit("scorring", points);
    }
  });

  socket.on("success", () => {
    removedCards.push(cardIndex);
    points = points + cards[cardIndex].value;
  });
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
