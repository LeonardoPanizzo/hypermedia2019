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
            //TODO remove this after testing and put the correct function
            //artisticEventsAndSeminarsSeparatly(artisticEvents, seminars, true)
            //listMixedEvents(artisticEvents, seminars)
          );
      })
  })

})

$("#buttonEventsToday").click(function(){
  window.location.replace(DOMAIN_ADDRESS + "/pages/eventsToday.html");
})
