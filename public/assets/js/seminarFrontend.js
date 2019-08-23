$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/seminar.html");
  $.get(DOMAIN_ADDRESS + "/seminar/" + id, function(seminar){
    console.log(seminar.title);
  })
})
