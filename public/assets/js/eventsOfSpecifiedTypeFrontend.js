$(document).ready(function(){
  var areArtisticEvents;
  var query;
  //let indexStartId = (DOMAIN_ADDRESS + "/pages/eventsOfSpecifiedType.html?").length;
  //var type = (window.location.href).substring(indexStartId);
  var type = getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/eventsOfSpecifiedType.html");
  var appendToTitle;
  //set the boolean 'areArtisticEvents'
  if(type === "seminar") {
    areArtisticEvents = false;
    appendToTitle = "Seminars";
  }
  else{
    areArtisticEvents = true;
    appendToTitle = capitalizeFirstLetter(type) + " Events";
  }
  $('#titleEventsOfTypeX').append(" " + appendToTitle);
  if(areArtisticEvents){
    query = DOMAIN_ADDRESS + "/artisticEvent/type/" + type;
  }
  else{
    query = DOMAIN_ADDRESS + "/seminar/all";
  }
  $.ajax({
    url : query,
    type : 'GET',
    success:(events)=>{
      $('#listEventsOfTypeX').append(
        sameTypeListEventsDivByDay(events, areArtisticEvents)
      );
    },
  });
})
