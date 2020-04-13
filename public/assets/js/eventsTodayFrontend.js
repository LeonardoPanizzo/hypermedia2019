/*
Script that appends the list of all the events planned for today to the
repsective web page.
*/
$(document).ready(function(){
  var artisticEvent;
  var seminars;
  $.ajax({//store the artistic events in the variable artisticEvents
    url : DOMAIN_ADDRESS + "/artisticEvent/today",
    type : 'GET',
    success:(data)=>{
      artisticEvents = data;
    },
  }).then(//store the semiars in the variable semiars
    function(){
      $.ajax({
        url : DOMAIN_ADDRESS + "/seminar/today",
        type : 'GET',
        success:(data)=>{
          seminars = data;
        },
      }).then(
        function(){
          var stringToAppend;
          if(artisticEvents.length > 0 || seminars.length > 0){ //if there is at least one event today
            stringToAppend = artisticEventsAndSeminarsSeparately(artisticEvents, seminars, true);
          }
          else {//if there are no events today
            stringToAppend =
              "<h2 class='marg_top_M'>There are no events planned for today.</h2><br>"+
                "<h4 class='click_here_what_happens_today'>" +
                "<a href='calendar.html'>Click here</a>" +
                " to find something interesting!</h4>";
          }

          $('#eventsToday').append(stringToAppend);
      })
  })
})
