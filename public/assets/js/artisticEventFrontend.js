$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/artisticEvent.html");
  $.get(DOMAIN_ADDRESS + "/artisticEvent/" + id, function(arrayResult){
    var artisticEvent = arrayResult[0];
    console.log(artisticEvent.title);
  })
})
