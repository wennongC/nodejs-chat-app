var socket = io();

function scrollToBottom(){
  //Selectors
  var $messages = $('#messages');
  var $newMessage = $messages.children('li:last-child');
  //Height
  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');
  var newMessageHeight = $newMessage.innerHeight();
  var lastMessageHeight = $newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    $messages.scrollTop(scrollHeight);
  };
}

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
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
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
