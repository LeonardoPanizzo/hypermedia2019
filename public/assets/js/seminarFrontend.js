/*
Script that fills the page of a specific seminar with all the
required information
*/
$(document).ready(function(){
  var id =  getIdFromUrl();

  manageReservationInfo(id, false);

  $.get(DOMAIN_ADDRESS + "/seminar/" + id, function(result){
    var seminar = result[0];

    $('#orientationInfoAndTitle').append(
      orientationInfoAndTitle("Seminar", seminar.title)
    );

    $('#placeDateTime').append(
      dateTimePlaceInfo(seminar)
    );

    $('#descriptionEvent').append(
      descriptionForEvent(seminar.description)
    );

    $.get(DOMAIN_ADDRESS + "/artisticEvent/seminar/" + id, function(eventsDiscussed){
      $('#discussesEvents').append(
        "<div class='small_header'>" +
        "Artistic events discussed:" +
        "</div>" +
        listEvents(eventsDiscussed, true, true, true)
      );
    });

  })
})
