//basic server packages
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3050;
const cors = require("cors");
const { Server } = require("socket.io");

//routes
const handleLogin = require("./routes/handleLogin.js");
const handleNewAccount = require("./routes/handleNewAccount.js");
const getCards = require("./routes/getCards.js");
const prepDb = require("./routes/prepDb.js");
const handleGoogleOAuth = require("./routes/handleGoogleOAuth.js");

//authentication packages
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

//Oauth packages
const token = process.env.GOOGLE_CONSUMER_KEY;
const tokenSecret = process.env.GOOGLE_CONSUMER_SECRET;
const { OAuth2Client } = require("google-auth-library");
const OAuth2client = new OAuth2Client(token);

//this to test and prepare dB
prepDb();

//basic cors setup
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of react app
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
// //alternative (might use)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//more middleware
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));

//routes

app.post("/login", (req, res) => {
  console.log("\nbody:", req.body);
  handleLogin(req, res);
});
app.post("/register", (req, res) => {
  console.log("\nbody:", req.body);
});
app.get("/user", (req, res) => {});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/gamePlay.html");
}); // <-- sends card game html

app.get("/auth/google", (req, res) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: token,
        clientSecret: tokenSecret,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          console.log("\nerr:\n", err);
          console.log("\nuser:\n", user);
          return done(err, user);
        });
      }
    )
  );
  passport.authenticate("google", { scope: ["email", "profile"] });
});

// the failure route below is not implimented yet
app.get(
  "/auth/google/callback",
  (req, res) => {
    console.log("callback running");
    passport.authenticate("google", { failureRedirect: "/" });
  },
  function (req, res) {
    res.redirect("/");
  }
);

app.put("/newAccount", (req, res) => {});

app.get("/newAccountSubmission", (req, res) => {
  handleNewAccount(req, res);
});

app.put("/getCards", (req, res) => {
  const cards = getCards(req, res);
  res.send(cards);
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
