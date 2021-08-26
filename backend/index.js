const app = require("express")();
const port = 3050;
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server);
io.on("connection", () => {
  /* … */
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
