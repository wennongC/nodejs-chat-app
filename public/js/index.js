var socket = io();

socket.on("updateRoomList", function(rooms){
  var $sel = $('[name = currentRoom]');
  $sel.html('<option value="default">N/A</option>');
  $('#num').text(rooms.length);

  rooms.forEach(function(room){
    var $opt = $('<option></option>');
    $opt.attr('name', room);
    $opt.text(room);
    $sel.append($opt);
  });
});


$('#login').on('submit', function(e){
  var name = $('[name = name]').val().trim();
  var room = $('[name = room]').val().trim();
  var $nameWarn = $('#name-warn');
  var $roomWarn = $('#room-warn');
  $nameWarn.text('');
  $roomWarn.text('');

  if(!name){
    e.preventDefault();
    $nameWarn.text('*Please enter the User name');
  }else{
    socket.emit("nameCheck", name, function(err){
      if(err){
        e.preventDefault();
        $nameWarn.text(err);
      }
    });
  }

  if(!room){
    e.preventDefault();
    $roomWarn.text('*Please enter the Room name');
  }else if(room === 'N/A'){
    e.preventDefault();
    $roomWarn.text('*Please don\'t use "N/A" as Room name');
  }

});

$('[name = currentRoom]').change(function(){
  var value = $( 'select option:selected' ).text();
  var $input = $('input[name = room]');

  if(value === 'N/A'){
    return $input.val('');
  }

  $input.val(value);
  $('#room-warn').text('');
});
