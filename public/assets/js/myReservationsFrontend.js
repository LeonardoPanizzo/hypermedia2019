/*
Script for maanging and displaying the list of a user's reservations.
*/
const BUTTON_REMOVE_EVENT_PREFIX = "buttonRemove";
const PREFIX_ID_REMOVE_ART_EV = BUTTON_REMOVE_EVENT_PREFIX + "ArtEv";
const PREFIX_ID_REMOVE_SEM = BUTTON_REMOVE_EVENT_PREFIX + "Sem";

$(document).ready(function(){

  if(!document.cookie){
    alert('you are not logged in!');
    window.location.replace(DOMAIN_ADDRESS);
  }
  else{

    var artisticEvents;
    var seminars;
    var stringResults;

    /*
    The button to confirm the request to delete all the reservations is
    hidden at first. It is shown only after clicking on the button that
    requests that action.
    */
    $('#confirmationDeleteAll').hide();
    $('#confirmationDeleteAll').append(
      "<p class='marg_top_M'>Do you really want to cancel all of your reservations?</p>" +
      "<button id='yesDeleteAll' class='rectangular_std_btn'>Confirm</button>" +
      "<button id='noDeleteAll' class='rectangular_std_btn'>Cancel</button>"
    );

    $.get( DOMAIN_ADDRESS + "/reservationArtisticEvent/", function(results){
      artisticEvents = results;
    }).then(function(){
      $.get( DOMAIN_ADDRESS + "/reservationSeminar/", function(results){
        seminars = results;
      }).then(function(){
        //if the user has zero reservations
        if(artisticEvents.length === 0 && seminars.length === 0){
          stringResults =
          "<h2>You don't have reserations for any event.</h2><br>"+
            "<h4>" +
            "<a href='calendar.html'>Click here</a>" +
            " to find something interesting!</h4>";
        }
        else{ //if the user has one or more reservations
          $('#spaceForButtonDeleteAll').append(
            "<button class='btn btn-danger btn-lg' id='buttonDeleteAllReservations' role='button'>" +
              "<i class='material-icons'>delete_forever</i>" +
              "Delete All" +
            "</button>"
          );
          stringResults = reservationResults(artisticEvents, seminars);
        }
        $('#reservationList').append(stringResults);
        /*
        this button (buttonDeleteAllReservations) needs to stay inside
        (document).ready: otherwise it will not work!!
        (because it is created inside of this part of code)
        */
        $('#buttonDeleteAllReservations').click(function(){
          $('#confirmationDeleteAll').show();
        });
      });
    });
    /*
    these buttons (noDeleteAll and yesDeleteAll) need to stay inside
    (document).ready: otherwise they will not work!!
    (because they are created inside of this part of code)
    */
    $('#noDeleteAll').click(function(){
        $('#confirmationDeleteAll').hide();
    });


    $('#yesDeleteAll').click(function(){
      deleteAllReservations();
    });
  }
})

/*
Returns html code as a string, representing the list of the
events reserved by the user.

Parameters:
  artisticEvents: artistic events received from the database
  seminars: seminars received from the database
*/
function reservationResults(artisticEvents, seminars){
  var stringToReturn = "";
  var indexArt = 0;
  var indexSem = 0;
  while(indexArt < artisticEvents.length && indexSem < seminars.length){
    if(artisticEvents[indexArt].dateAndTime <= seminars[indexSem].dateAndTime){
      stringToReturn += artisticEventInReservations(artisticEvents[indexArt]);
      indexArt++;
    }
    else{
      stringToReturn += seminarInReservations(seminars[indexSem]);
      indexSem++;
    }
  }
  //when one of the two arrays has been iterated, finish iterating the remaining one
  while(indexArt < artisticEvents.length){
    stringToReturn += artisticEventInReservations(artisticEvents[indexArt], true);
    indexArt++;
  }
  while(indexSem < seminars.length){
    stringToReturn += seminarInReservations(seminars[indexSem], true);
    indexSem++;
  }

  return stringToReturn;
}

/*
Returns html code as a string, representing the reservation of
a specific artistic event.

Parameters:
  artisticEvent: specific artistic event as it is defined in the database
*/
function artisticEventInReservations(artisticEvent){
  return eventInReservations(artisticEvent, true);
}

/*
Returns html code as a string, representing the reservation of
a specific seminar.

Parameters:
  seminar: specific seminar as it is defined in the database
*/
function seminarInReservations(seminar){
  return eventInReservations(seminar, false);
}

/*
Returns html code as a string, representing the reservation of
a specific event.

Parameters:
  event: specific event as it is defined in the database
  isArtisticEvent: boolean that specifies if the event is
              an artistic or a seminar
*/
function eventInReservations(event, isArtisticEvent){
  var idRemoveEvent;
  var id;
  var urlEvent;
  if(isArtisticEvent){
    id = event.idevent;
    urlEvent = getUrlArtisticEvent(id);
    idRemoveEvent = PREFIX_ID_REMOVE_ART_EV;
  }
  else{//seminar
    id = event.idseminar;
    urlEvent = getUrlSeminar(id);
    idRemoveEvent = PREFIX_ID_REMOVE_SEM;
  }
  var stringToReturn =
    "<div class='container row border_elem_in_list justify-content-center'>" +
        "<div class='col-sm-5'>" +
          "<p><a href='" + urlEvent + "'>" + event.title +
          "</a></p>" +
          "<p class='simpler_p'>";
          if(isArtisticEvent){
            stringToReturn += event.type;
          }
          else{//seminar
            stringToReturn += "seminar";
          }
          stringToReturn +=
          "</p>" +
          "<p class='simpler_p'>" +
          getFullDate(event.dateAndTime) + " at " +
          getTime(event.dateAndTime) +
          "</p>" +
        "</div>" +
        "<div class='col-sm-2 add_remove_btn_reserv'>"+
          "<button id='" + idRemoveEvent + id +"' class='big_enough_square_std_btn'>" +
            "<i class='material-icons'>remove_shopping_cart</i></button>"+
        "</div>"
    "</div>";

  return stringToReturn;
}

//on click listener for removing a specific artistic event
$(document).on('click', "[id^=" + PREFIX_ID_REMOVE_ART_EV + "]", function(){
  deleteReserv("/reservationArtisticEvent/", this.id.substring(PREFIX_ID_REMOVE_ART_EV.length))
})

//on click listener for removing a specific seminar
$(document).on('click', "[id^=" + PREFIX_ID_REMOVE_SEM + "]", function(){
  deleteReserv("/reservationSeminar/", this.id.substring(PREFIX_ID_REMOVE_SEM.length))
})

//Delete all the reservations associated with the user
function deleteAllReservations(){
  $.ajax({
    url : DOMAIN_ADDRESS + '/reservationArtisticEvent',
    type : 'DELETE',
  }).then(function(){
    $.ajax({
      url : DOMAIN_ADDRESS + '/reservationSeminar',
      type : 'DELETE',
    }).then(function(){
      window.location.replace(window.location.href);
    });
  });
}
/*
Delete a specific reservation.

Parameters:
  queryKindOfReservation: string used as command to specify the
            kind of reservation to delete (artistic event or semiar)
  idObjToRemove: id of the object to remove
*/
function deleteReserv(queryKindOfReservation, idObjToRemove){
  $.ajax({
    url : DOMAIN_ADDRESS + queryKindOfReservation + idObjToRemove,
    type : 'DELETE',
    data : {
    },
    dataType : 'json',
  }).then(function(){
    window.location.replace(window.location.href);
  });
}
