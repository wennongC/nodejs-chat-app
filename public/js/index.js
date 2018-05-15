var socket = io();

socket.on("connect", function() {
  console.log("connected to server");

});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(newMessage) {
  console.log("new message", newMessage);

  var $li = $('<li></li>');
  $li.text(`${newMessage.from}: ${newMessage.text}`);

  $('#messages').append($li);
});

$('#message-form').on("submit", function(e){
  e.preventDefault();

  socket.emit("createMessage", {
    from: 'User',
    text: $('[name=message]').val()
  }, function(){});
});
