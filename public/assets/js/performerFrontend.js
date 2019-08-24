$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/performer.html");
  $.get(DOMAIN_ADDRESS + "/performer/" + id, function(result){
    var performer = result[0];

    $('#orientationInfoAndTitle').append(
      orientationInfoAndTitle("Performer", performer.name)
    );
    var infoForBlindPeople;
    if(performer.isgroup){
      infoForBlindPeople = "group " + performer.name;
    }
    else{
      infoForBlindPeople = "artist " + performer.name;
    }
    $('#spaceForCarousel').append(
      //carouselForMTopics(DOMAIN_ADDRESS + "/assets/img/performer/" + id)
      carouselForMTopics("../assets/img/performer/" + id, infoForBlindPeople)
    );
  })
})
