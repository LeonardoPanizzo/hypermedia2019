$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/artisticEvent.html");
  $.get(DOMAIN_ADDRESS + "/artisticEvent/" + id, function(artisticEvent){
    console.log(artisticEvent.title);
  })
})
