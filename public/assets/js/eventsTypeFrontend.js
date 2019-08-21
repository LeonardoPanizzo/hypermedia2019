$(document).ready(function(){

  const PREFIX_PATH = DOMAIN_ADDRESS + "/pages/eventsOfSpeicifiedType.html";
  var stringToAppend = "";

  $.ajax({//all types of artistic events
    url : DOMAIN_ADDRESS + "/artisticEvent/types",
    type : 'GET',
    success:(types)=>{
      for(obj of types){
        var type = obj.type;
        stringToAppend +=
          //"<a href='" + PREFIX_PATH + "?" + type + "'>" + capitalizeFirstLetter(String(type)) + "</a>";
          "<p><a href='" + PREFIX_PATH + "?" + type + "'>" + capitalizeFirstLetter(type) + "</a></p>";
      }
    },
  }).then(function(){
    //add the type 'seminar'
    const SEMINAR = "seminar";
    stringToAppend +=
      "<p><a href='" + PREFIX_PATH + "?" + SEMINAR + "'>" + capitalizeFirstLetter(SEMINAR) + "</a></p>";

    $('#allEventsType').append(stringToAppend);
  });
})
