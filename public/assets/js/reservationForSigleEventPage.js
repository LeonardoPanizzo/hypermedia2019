function buttonGetReservation(){
  var stringToReturn =
  "<button class='btn btn-success btn-lg' role='button' id='buttonGetReservation'>" +
    "Reserve ticket!" +
  "</button>";
  return stringToReturn;
}

function manageReservationInfo(id, isArtisticEvent){
  var alreadyGotReservation = false; //if the user is not logged, show his the button to get reservation
  var prefixQuery;
  if(isArtisticEvent){
    prefixQuery = "/reservationArtisticEvent";
  }
  else{
    prefixQuery = "/reservationSeminar";
  }
  if(document.cookie){
    $.get(DOMAIN_ADDRESS + prefixQuery +"/" + id, function(answer){
      alreadyGotReservation = answer.message;
      if(alreadyGotReservation){
        $("#buttonGetReservation").hide();
        $('#infoReservationForEventPage').append("<div class='reserved_event_label'>Ticket reserved <i class='material-icons'>check_circle_outline</i></div>");
      }
      else{
        $("#buttonGetReservation").click(function(){
          $.ajax({
            url: DOMAIN_ADDRESS + prefixQuery,
            type: 'POST',
            data:{
              'id': id
            },
            dataType: 'json',
            success:(data)=>{
              window.location.replace(window.location.href);
            }
          });

        });
      }
    });
  }
  else{ //if not logged
    $("#buttonGetReservation").click(function(){
        alert("You should log in first!");
        window.location.assign( DOMAIN_ADDRESS + "/pages/login.html");
    });
  }
}
