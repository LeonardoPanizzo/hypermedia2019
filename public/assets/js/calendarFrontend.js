$(document).ready(function(){

  var artisticEvents;
  var seminars;

  $.ajax({//store the artistic events in the variable artisticEvents
    url : DOMAIN_ADDRESS + "/event/all",
    type : 'GET',
    success:(data)=>{
      artisticEvents = data;
    },
  }).then(//store the semiars in the variable semiars
    function(){
      $.ajax({
        url : DOMAIN_ADDRESS + "/seminar/all",
        type : 'GET',
        success:(data)=>{
          seminars = data;
        },
      }).then(
        function(){
          $('#eventsCalendar').append(
            "<p><b>prova artisticEvents dall'esterno:</b> " + artisticEvents[0].description + "</p>"
          );
          $('#eventsCalendar').append(
            "<p><b>prova seminar dall'esterno:</b> " + seminars[0].description + "</p>"
          );
      })
  })


})
