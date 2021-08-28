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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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
    cardIndex++;
    if (cardIndex > cards.length - 1) {
      cardIndex = 0;
    }
  });

  socket.on("new card", () => {
    if (gameActive) {
      io.emit("new card", cards[cardIndex]);
      cardIndex++;
      if (cardIndex > cards.length - 1) {
        cardIndex = 0;
      }
    }
  });
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
