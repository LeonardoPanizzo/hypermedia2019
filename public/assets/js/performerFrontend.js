/*
Script that fills the page of a specific performer with all the
required information
*/
$(document).ready(function(){
  var id =  getIdFromUrl();
  var infoForBlindPeople;
  var thisGroupOrArtist;

  $.get(DOMAIN_ADDRESS + "/performer/" + id, function(result){
    var performer = result[0];

    $('#orientationInfoAndTitle').append(
      orientationInfoAndTitle("Performer", performer.name)
    );
    if(performer.isgroup){
      $('#groupMembers').append(
        "<div class='small_header'>Members</div>" +
        "<p>" + performer.members + "</p>"
      );
      infoForBlindPeople = "group " + performer.name;
      thisGroupOrArtist = "This group";
    }
    else{
      infoForBlindPeople = "artist " + performer.name;
      thisGroupOrArtist = "This artist";
    }
    $('#spaceForCarousel').append(
      carouselForMTopics("../assets/img/performer/" + id, infoForBlindPeople)
    );
    $('#shortDescriptionPerformer').append(
      "<div class='small_header'>General info</div>" +
      "<p>" + performer.shortdescription + "</p>"
      );

    $('#affiliation').append(
      "<div class='small_header'>Affiliation</div>" +
      "<p>" + performer.affiliation + "</p>"
    );
    $('#achievements').append(
      "<div class='small_header'>Achievements</div>" +
      "<p>" + performer.achievements + "</p>"
    );
    $('#detailsPerformer').append(
      "<div class='small_header'>Details</div>" +
      "<p>" + performer.details + "</p>"
    );
    $.get(DOMAIN_ADDRESS + "/artisticEvent/performer/" + id, function(eventsInWhichPerforms){
      $('#performsIn').append(
        "<div class='small_header'>" +
        thisGroupOrArtist + " performs at the following events:" +
        "</div>" +
        listEvents(eventsInWhichPerforms, true, true, true)
      );
    });

  })
})
