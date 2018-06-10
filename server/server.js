const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public'); //'join' can omit unneccesry path
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {

  socket.on('join', (params, callback) => {
    params.name = params.name.trim();
    params.room = params.room.trim();
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('User name and Room name are required');
    }
    if(!users.duplicateNameCheck(params.name)){
      return callback('This user name have been used already');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    console.log(`>>> ${params.name} IS JOINING ${params.room}`);
    io.emit("currentPeople", users.users.length);//update users information

    io.to(params.room).emit("updateUserList",
      users.getUserList(params.room));
    socket.emit("newMessage",
      generateMessage('Admin', `Welcome to The room :" ${params.room} "`));
    socket.broadcast.to(params.room).emit("newMessage",
      generateMessage('Admin', `New user "${params.name}" joined`));

    callback();
  });

  socket.on("createMessage", (newMessage, callback) => {


    var user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)){
      io.to(user.room).emit("newMessage",
        generateMessage(user.name, newMessage.text));
    }
    console.log(`LOG>>${user.name}: ${newMessage.text}`);
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    io.emit('newLocationMessage',
      generateLocationMessage(user.name, coords.latitude, coords.longitude));

    console.log(`LOG-LOCATION>>${user.name}`);
  });

  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit("newMessage",
        generateMessage('Admin', `The user "${user.name}" leaved chat app`));

      io.emit("currentPeople", users.users.length);//update users information
      console.log(`>>> ${user.name} IS LEAVING ${user.room}`);
    }
  });
});

server.listen(port, () => {
  console.log(`Started on the port ${port}`);
});
