const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");

//set view engine
app.set("view engine", "ejs");

// set the pubic url to static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected");
  });
});

server.listen(3030);
