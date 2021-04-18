const express = require("express");
const socket = require("socket.io");

const PORT = 4000;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup & pass server
const io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", function (data) {
    io.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
