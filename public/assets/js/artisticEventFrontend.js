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
    //test getting artistic events in the same day /artisticEvent/sameDay/:id
    $.get(DOMAIN_ADDRESS + "/artisticEvent/sameDay/" + id, function(eventsSameDay){
      console.log(eventsSameDay.length);
      for(eventSD of eventsSameDay){
        console.log(eventSD.title);
      }
    });
  });
})
