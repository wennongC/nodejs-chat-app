var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("currentPeople", function(num){
  $("#currentPeople").text(num);
});

socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var $li = $('<li></li>');
  $li.text(`${message.from} (${formattedTime}): ${message.text}`);
  $('#messages').append($li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createAt).format('h:mm a');
  var $li = $('<li></li>');
  var $a = $('<a target="_blank">My Current Location</a>');
  $li.text(`${message.from} (${formattedTime}): `);
  $a.attr('href', message.url);
  $li.append($a);
  $('#messages').append($li);
});

$('#message-form').on("submit", function(e){
  e.preventDefault();
  var $messageTextbox = $('[name=message]');

  if(!$messageTextbox.val().trim()){
    return alert('You can\'t send blank message!');
  }

  socket.emit("createMessage", {
    from: 'User',
    text: $messageTextbox.val()
  }, function(){
    $messageTextbox.val('');
  });
});

var $locationButton = $('#send-location');
$locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
  }

  $locationButton.attr('disabled','disabled');
  $locationButton.text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    $locationButton.removeAttr('disabled');
    $locationButton.text('Send Your Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    $locationButton.removeAttr('disabled');
    $locationButton.text('Send Your Location');
    alter('Unable to fetch the geolocation');
  });
});
