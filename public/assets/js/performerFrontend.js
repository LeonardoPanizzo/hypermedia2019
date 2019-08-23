$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/performer.html");
  $.get(DOMAIN_ADDRESS + "/performer/" + id, function(result){
    var performer = result[0];
    console.log(performer.name);
  })
})
