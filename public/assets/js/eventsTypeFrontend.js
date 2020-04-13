/*
Script that shows the list of all the different types of events as
clickable items to get the list of the events of that type.
*/
$(document).ready(function(){

  const PREFIX_PATH = DOMAIN_ADDRESS + "/pages/eventsOfSpecifiedType.html";
  var stringToAppend = "";

  $.ajax({//all types of artistic events
    url : DOMAIN_ADDRESS + "/artisticEvent/types",
    type : 'GET',
    success:(types)=>{
      for(obj of types){
        var type = obj.type;
        stringToAppend +=
          "<div><a href='" + PREFIX_PATH + "?" + type + "'>" + capitalizeFirstLetter(type) + "</a></div>";
      }
    },
  }).then(function(){
    //add the type 'seminar'
    const SEMINAR = "seminar";
    stringToAppend +=
      "<div><a href='" + PREFIX_PATH + "?" + SEMINAR + "'>" + capitalizeFirstLetter(SEMINAR) + "</a></div>";

    $('#allEventsType').append(stringToAppend);
  });
})
