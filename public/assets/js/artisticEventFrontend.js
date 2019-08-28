$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/artisticEvent.html");
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
            listEvents(seminars, false, true)
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
