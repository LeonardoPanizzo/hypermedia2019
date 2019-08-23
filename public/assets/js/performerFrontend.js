$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/performer.html");
  $.get(DOMAIN_ADDRESS + "/performer/" + id, function(performer){
    console.log(performer.name);
  })
})
