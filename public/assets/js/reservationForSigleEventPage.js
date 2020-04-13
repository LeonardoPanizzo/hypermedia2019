/*
File containing functions used to diplay and interact with general
elements for pages of signle events, regardless of the spicific type
of event.
*/

/*
Displays the button to get a reservation based on the fact the user has already
reserved the event or not and also manages what happens clicking on it,
acting differently based on the fact the user is logged in or not.
*/
function manageReservationInfo(id, isArtisticEvent){
  //if the user is not logged, show them the button to get reservation anyway
  var alreadyGotReservation = false;
  var prefixQuery;
  if(isArtisticEvent){
    prefixQuery = "/reservationArtisticEvent";
  }
  else{
    prefixQuery = "/reservationSeminar";
  }
  //if the user is logged in
  if(document.cookie){
    $.get(DOMAIN_ADDRESS + prefixQuery +"/" + id, function(answer){
      alreadyGotReservation = answer.message;
      if(alreadyGotReservation){
        $("#buttonGetReservation").hide();
        $('#infoReservationForEventPage').append(
          "<div class='reserved_event_label'>Ticket reserved " +
          "<i class='material-icons'>check_circle_outline</i></div>");
      }
      else{ // if this event not already reserved by this user
        // on click listener for getting the reservation for this event
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
  else{ //if the user is not logged in
    //if they try to get the reservation, send them to the log in page
    $("#buttonGetReservation").click(function(){
        alert("You should log in first!");
        window.location.assign( DOMAIN_ADDRESS + "/pages/login.html");
    });
  }
}
