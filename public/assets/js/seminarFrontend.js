$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/seminar.html");
  $.get(DOMAIN_ADDRESS + "/seminar/" + id, function(result){
    var seminar = result[0];
    //$('#titleToAppend').append(seminar.title);
    $('#orientationInfoAndTitle').append(
      orientationInfoAndTitle("Seminar", seminar.title)
    );

    $('#placeDateTime').append(
      dateTimePlaceInfo(seminar)
    );

    $('#descriptionEvent').append(
      descriptionForEvent(seminar.description)
    );
      //TODO adatta a seminari
    $.get(DOMAIN_ADDRESS + "/artisticEvent/seminar/" + id, function(eventsDiscussed){
      //console.log(eventsDiscussed[0].title);
      $('#duscussesEvents').append(
        "<div class='small_header'>" +
        "Events discussed:" +
        "</div>" +
        listEvents(eventsDiscussed, true, true)
      );
    });

  })
})
