const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public'); //'join' can omit unneccesry path
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("createMessage", function(newMessage){
    console.log("create message", newMessage);

    io.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      createAt: new Date().getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("A User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Started on the port ${port}`);
});
