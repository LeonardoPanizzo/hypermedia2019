$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/artisticEvent.html");
  var alreadyGotReservation = false; //if the user is not logged, show his the button to get reservation
  if(document.cookie){
    $.get(DOMAIN_ADDRESS + "/reservationArtisticEvent/" + id, function(answer){
      alreadyGotReservation = answer.message;
      //alert("alreadyGotReservation: " + alreadyGotReservation);
      if(alreadyGotReservation){
        $("#buttonGetReservation").hide();
        $('#infoReservationForEventPage').append("<div class='reserved_event_label'>Ticket reserved <i class='material-icons'>check_circle_outline</i></div>");
      }
      $("#buttonGetReservation").click(function(){
        if(alreadyGotReservation){
          alert("TODO!");
        }
        else{//add reservation for this event
          $.ajax({
            url: DOMAIN_ADDRESS + '/reservationArtisticEvent',
            type: 'POST',
            data:{
              'id': id
            },
            dataType: 'json',
            success:(data)=>{
              window.location.replace(window.location.href);
            }
          });
        }
      });
    });
  }
  else{ //if not logged
    $("#buttonGetReservation").click(function(){
        alert("You should log in first!");
        window.location.assign( DOMAIN_ADDRESS + "/pages/login.html");
    });
  }
/*
  $("#buttonGetReservation").click(function(){
    if(document.cookie){
      if(alreadyGotReservation){
        //you already have a reservation for this event
        alert("TODO!!");
      }
      else{
        $.ajax({
          url: DOMAIN_ADDRESS + '/reservationArtisticEvent',
          type: 'POST',
          data:{
            'id': id
          },
          dataType: 'json',
          success:(data)=>{

          }
        })
      }
    }
    else{
      alert("You should log in first!");
      window.location.assign( DOMAIN_ADDRESS + "/pages/login.html");
    }
  });*/

  $.get(DOMAIN_ADDRESS + "/artisticEvent/" + id, function(result){
    var artisticEvent = result[0];
    $('#orientationInfoAndTitle').append(
      orientationInfoAndTitle("Artistic Event", artisticEvent.title)
    );
    $('#placeDateTime').append(
      dateTimePlaceInfo(artisticEvent)
    );
    $('#spaceForCarousel').append(
      carouselForMTopics("../assets/img/artistic_event/" + id, "artistic event")
    );
    $('#descriptionEvent').append(
      descriptionForEvent(artisticEvent.description)
    );
    $('#lbType').append(
      "<p>Type: " + artisticEvent.type.toUpperCase() + "</p>"
    );
/*
    $('#spaceButtonGetReservation').append(
      buttonGetReservation()
    );
*/
    $.get(DOMAIN_ADDRESS + "/artisticEvent/sameDay/" + id, function(eventsSameDay){
      //if(eventsSameDay.length > 0){
        $('#otherEventsSameDay').append(
          "<div class='small_header'>" +
          "Artistic Events in the Same Day:" +
          "</div>" +
          listEventsOrEmptySign(eventsSameDay, true, true, true)
        );
      //}
    });
    $.get(DOMAIN_ADDRESS + "/performer/artisticEvent/" + id, function(performers){
      $('#artistsInThisEvent').append(
        "<div class='small_header'>" +
        "Performers at the event:" +
        "</div>" +
        listOfPerformers(performers)
      );
    });
    $.get(DOMAIN_ADDRESS + "/seminar/artisticEvent/" + id, function(seminars){
        if(seminars.length > 0){
          /*
          It can be only zero or one, but to make it scalable, we will
          use a method that can display a list of seminars
          */
          $('#seminarLinkedToThisEvent').append(
            "<div class='small_header'>" +
            "Seminar about this event:" +
            "</div>" +
            listEvents(seminars, false, false, true)
          );
      }
    });



  });

})


function listOfPerformers(performers){
  var stringToReturn = "";
  for(performer of performers){
    stringToReturn +=
      "<p class='marg_top_M'><a href='" + getUrlPerformer(performer.idperformer) + "'>" +
       performer.name +
       "</a></p>";
  }
  return stringToReturn;
}
