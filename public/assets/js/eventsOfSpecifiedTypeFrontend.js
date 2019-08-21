$(document).ready(function(){
  var events;
  var areArtisticEvents;
  //TODO: ajax etc
  $('#listEventsOfTypeX').append(
    sameTypeListEventsDivByDay(events, areArtisticEvents)
  );
})
