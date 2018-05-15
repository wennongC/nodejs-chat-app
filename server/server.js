const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public'); //'join' can omit unneccesry path
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.emit("newMessage",
    generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit("newMessage",
    generateMessage('Admin', 'New user joined'));

  socket.on("createMessage", (newMessage, callback) => {
    console.log("create message", newMessage);
    io.emit("newMessage",
      generateMessage(newMessage.from, newMessage.text));

    callback();
  });

  socket.on("disconnect", () => {
    console.log("A User Disconnected");
    socket.broadcast.emit("newMessage",
      generateMessage('Admin', 'A user leaved chat app'));
  });
});

server.listen(port, () => {
  console.log(`Started on the port ${port}`);
});
