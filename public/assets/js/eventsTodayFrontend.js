$(document).ready(function(){
  var artisticEvent;
  var seminars;
  $.ajax({//store the artistic events in the variable artisticEvents
    url : DOMAIN_ADDRESS + "/TODO QUERY ARTISTIC EVENTS TODAY",
    type : 'GET',
    success:(data)=>{
      artisticEvents = data;
    },
  }).then(//store the semiars in the variable semiars
    function(){
      $.ajax({
        url : DOMAIN_ADDRESS + "/TODO QUERY SEMINARS TODAY",
        type : 'GET',
        success:(data)=>{
          seminars = data;
        },
      }).then(
        function(){
          $('#eventsToday').append(
            artisticEventsAndSeminarsSeparately(artisticEvents, seminars, true)
          );
      })
  })
})
