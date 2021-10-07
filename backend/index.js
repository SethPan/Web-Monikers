require("dotenv").config();
const express = require("express");
const passport = require("passport");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3050;
const cors = require("cors");
const { Server } = require("socket.io");
const handleLogin = require("./routes/handleLogin.js");
const handleNewAccount = require("./routes/handleNewAccount.js");
const getCards = require("./routes/getCards.js");
const prepDb = require("./routes/prepDb.js");
const handleGoogleOAuth = require("./routes/handleGoogleOAuth.js");

const { OAuth2Client } = require("google-auth-library");
const OAuth2client = new OAuth2Client(process.env.GOOGLE_CONSUMER_KEY);

prepDb();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//sends game html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/gamePlay.html");
});

app.post("/api/v1/auth/google", async (req, res) => {
  handleGoogleOAuth(req, res);
});

// the login route below is not implimented yet
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.put("/userLogin", (req, res) => {
  // console.log("\nbody:\n", req.body);
  handleLogin(req, res);
});

app.put("/getCards", (req, res) => {
  const cards = getCards(req, res);
  res.send(cards);
});

app.put("/newAccount", (req, res) => {});

app.get("/newAccountSubmission", (req, res) => {
  handleNewAccount(req, res);
});

class cardPool {
  constructor(title, description, value) {
    this.title = title;
    this.title.description = description;
    this.title.value = value;
  }
}
//make this retrieve cards from db
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
let pointsT1 = 0;
let pointsT2 = 0;
const users = {};
let turn = 1;

function whatTeamTurn() {
  if (turn % 2 === 0) {
    return "team 2";
  } else return "team 1";
}

const io = new Server(server);
io.on("connection", (socket) => {
  const id = socket.id;
  if (!users[id]) {
    users[id] = "no team";
    console.log("a user connected: ", socket.id);
  }

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete users[id];
  });

  socket.on("team 1", () => {
    users[id] = "team 1";
    socket.emit("team chosen");
  });

  socket.on("team 2", () => {
    users[id] = "team 2";
    socket.emit("team chosen");
  });

  socket.on("chat message", (msg) => {
    if (gameActive) {
      io.emit("chat message", msg);
    } else {
      socket.emit("chat message", "The game has not started yet.");
    }
  });

  socket.on("start game", () => {
    io.emit("start game");
    gameActive = true;
    io.emit("new card", cards[cardIndex]);
  });

  socket.on("new card", () => {
    if (whatTeamTurn() === users[socket.id]) {
      cardIndex++;
      if (gameActive) {
        //checking if game is over
        if (cards.length === removedCards.length) {
          gameActive = false;
        }

        if (cardIndex > cards.length - 1) {
          cardIndex = 0;
        }
        if (gameActive) {
          while (removedCards.includes(cardIndex)) {
            cardIndex++;
            if (cardIndex > cards.length - 1) {
              cardIndex = 0;
            }
          }
        }

        const score = { pointsT1, pointsT2 };
        io.emit("scorring", score);
        io.emit("new card", cards[cardIndex]);
        turn++;
      }
    } else {
      socket.emit("chat message", "it is not your turn yet");
    }
  });

  socket.on("success", () => {
    if (whatTeamTurn() === users[socket.id]) {
      if (users[socket.id] === "team 1") {
        pointsT1 = pointsT1 + cards[cardIndex].value;
      }
      if (users[socket.id] === "team 2") {
        pointsT2 = pointsT2 + cards[cardIndex].value;
      }
      removedCards.push(cardIndex);
    }

    if (cards.length === removedCards.length) {
      let winner = null;
      if (pointsT1 > pointsT2) {
        winner = "Team 1";
      }
      if (pointsT2 > pointsT1) {
        winner = "Team 2";
      }
      if (pointsT1 === pointsT2) {
        winner = "Tie Game";
      }
      io.emit("game over", winner);
    }
  });
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`App ExpressAPI listening at http://localhost:${port}`);
// });
