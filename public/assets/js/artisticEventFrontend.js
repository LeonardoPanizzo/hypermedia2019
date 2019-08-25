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
    $.get(DOMAIN_ADDRESS + "/artisticEvent/sameDay/" + id, function(eventsSameDay){
        //TODO
        $('#otherEventsSameDay').append(/*TODO*/);
      }
    });
    $.get(DOMAIN_ADDRESS + "/performer/artisticEvent/" + id, function(performers){
      //TODO
      $('#artistsInThisEvent').append(/*TODO*/);
    });

    $.get(DOMAIN_ADDRESS + "/seminar/artisticEvent/" + id, function(results){
        if(results.length > 0){ //can be only one
          //TODO
          $('#seminarLinkedToThisEvent').append(/*TODO*/);
      }
    });
ì


  });
})
