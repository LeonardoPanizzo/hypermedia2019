/*
Script that appends the list of all the performers to the repsective web page.
*/
$(document).ready(function(){
  //get all the perfromers
  $.get( DOMAIN_ADDRESS + "/performer" , function(allPerformers){
    for(performer of allPerformers){
      $('#allPerformers').append(
        "<div class='medium_header'>"+
          "<a href='" + getUrlPerformer(performer.idperformer) + "'>" +
          performer.name +
        "</a></div>" +
        "<p class='container center-block col-sm-7'>"+performer.details.substring(0,100)+
        "...</p></div>"
      );
    }
  });
})
