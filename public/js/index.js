var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  var $li = $('<li></li>');
  $li.text(`${message.from}: ${message.text}`);
  $('#messages').append($li);
});

socket.on('newLocationMessage', function(message){
  var $li = $('<li></li>');
  var $a = $('<a target="_blank">My Current Location</a>');
  $li.text(`${message.from}: `);
  $a.attr('href', message.url);
  $li.append($a);
  $('#messages').append($li);
});

$('#message-form').on("submit", function(e){
  e.preventDefault();
  var mes = $('[name=message]').val();

  if(!mes.trim()){
    return alert('You can\'t send blank message!');
  }

  socket.emit("createMessage", {
    from: 'User',
    text: mes
  }, function(){});
});

var $locationButton = $('#send-location');
$locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alter('Unable to fetch the geolocation');
  });
});
