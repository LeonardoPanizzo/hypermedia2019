/*
Script that fills the calendar page with the list of all the
events listed by date.
*/
$(document).ready(function(){

  var artisticEvents;
  var seminars;

  $.ajax({//store the artistic events in the variable artisticEvents
    url : DOMAIN_ADDRESS + "/artisticEvent",
    type : 'GET',
    success:(data)=>{
      artisticEvents = data;
    },
  }).then(//store the semiars in the variable semiars
    function(){
      $.ajax({
        url : DOMAIN_ADDRESS + "/seminar",
        type : 'GET',
        success:(data)=>{
          seminars = data;
        },
      }).then(
        function(){

          $('#eventsCalendar').append(
            listEventsDivByDay(artisticEvents, seminars, true, true)
          );
      })
  })

})

/*
Sends on the page of the list of events programmed for the current day
when clicking on the resepctive button.
*/
$("#buttonEventsToday").click(function(){
  window.location.assign(DOMAIN_ADDRESS + "/pages/eventsToday.html");
})
