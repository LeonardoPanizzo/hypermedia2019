$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/seminar.html");
  $.get(DOMAIN_ADDRESS + "/seminar/" + id, function(result){
    var seminar = result[0];
    console.log(seminar.title);
  })
})
