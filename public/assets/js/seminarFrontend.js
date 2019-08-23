$(document).ready(function(){
  var id =  getIdFromUrlBeforeQuestionMark(DOMAIN_ADDRESS + "/pages/seminar.html");
  $.get(DOMAIN_ADDRESS + "/seminar/" + id, function(arrayResult){
    var seminar = arrayResult[0];
    console.log(seminar.title);
  })
})
