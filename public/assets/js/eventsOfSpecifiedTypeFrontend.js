$(document).ready(function(){
  /*
  per tipo  /artisticEvent/type/:type
  esempio   /artisticEvent/type/opera
  */
  var areArtisticEvents;
  var query;
  let indexStartId = (DOMAIN_ADDRESS + "/pages/eventsOfSpecifiedType.html?").length;
  var type = (window.location.href).substring(indexStartId);
  //set the boolean 'areArtisticEvents'
  if(type === "seminar") {
    areArtisticEvents = false;
  }
  else{
    areArtisticEvents = true;
  }

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
