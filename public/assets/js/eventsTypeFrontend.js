$(document).ready(function(){

  const PREFIX_PATH = DOMAIN_ADDRESS + "/pages/eventsOfSpeicifiedType/";
  var stringToAppend = "";

  $.ajax({//all types of artistic events
    url : DOMAIN_ADDRESS + "/artisticEvent/types",
    type : 'GET',
    success:(types)=>{
      for(type of types){
        stringToAppend +=
          "<a href='" + PREFIX_PATH + "/" + type + "'>" + capitalizeFirstLetter(type) + "</a>";
      }
    },
  });
  //add the type 'seminar'
  const SEMINAR = "seminar";
  stringToAppend +=
    "<a href='" + PREFIX_PATH + "/" + SEMINAR + "'>" + capitalizeFirstLetter(SEMINAR) + "</a>";
    
  $('#allEventsType').append(stringToAppend);
})
