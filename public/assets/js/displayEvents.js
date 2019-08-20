/*
  If it isArtisticEvent = false => the event is a seminar.
  showType is a boolean.
*/
function eventInList(event, isArtisticEvent, showType){
  var urlEvent;
  if(isArtisticEvent){
    urlEvent = getUrlArtisticEvent(event.idevent);
    //urlEvent = DOMAIN_ADDRESS + "/pages/artisticEvent.html?" + event.idevent;
  }
  else{//seminar
    urlEvent = getUrlSeminar(event.idseminar);
  }
  var stringToReturn =
    "<p><a href='" + urlEvent + "'>" + event.title +
    "</a></p>" +
    "<p>( ";
  if(showType){ //write type if requested
    if(isArtisticEvent){
      stringToReturn += event.type;
    }
    else{//seminar
      stringToReturn += "seminar";
    }
    stringToReturn += " - ";
  }
  stringToReturn +=
    getTime(event.dateAndTime) + " )" +
    "</p>";

  return stringToReturn;
}

/*
  showType is a boolean.
*/
function artisticEventInList(event, showType){
  return eventInList(event, true, showType);
}

/*
  showType is a boolean.
*/
function seminarInList(event, showType){
  return eventInList(event, false, showType);
}

/*
  Return string to append with list of events if not empty,
  otherwise return a string that represents an empty list.
  "areArtisticEvents" is a boolean (if false => list of seminars).
*/
function listEventsOrEmptySign(events, areArtisticEvents, showType){
  if(events.length === 0){
    return "<p>-</p>"; //empty list sign
  }
  else{
    return listEvents(events, areArtisticEvents, showType);
  }
}

//Require events.length != 0
function listEvents(events, areArtisticEvents, showType){
  var stringToReturn = "";
  for(var i in events){
    if(areArtisticEvents){
      stringToReturn += artisticEventInList(events[i], showType);
    }
    else {
      stringToReturn += seminarInList(events[i], showType);
    }
  }
  return stringToReturn;
}

/*
  "areArtAndSeminSeparate" is a boolean.
*/
function listEventsDivByDay(artisticEvents, seminars, areArtAndSeminSeparate, showType){

}


function sameTypeListEventsDivByDay(events, areArtisticEvents){
  //TODO: (showType = false)

}

/*
  Artistic events and seminars will be displayed separate.
*/
function artisticEventsAndSeminarsSeparatly(artisticEvents, seminars, showType) {
  //first: list of artistic events
  //the header:
  var stringToReturn =
    "<div class='medium_header'>Artistic Events" +
    "</div>";
  //the actual list:
  stringToReturn += listEventsOrEmptySign(artisticEvents, true, showType);
  //then: list of seminars
  //the header:
  stringToReturn +=
  "<div class='medium_header'>Seminars" +
  "</div>";
  //then the actual list:
  stringToReturn += listEventsOrEmptySign(seminars, false, showType);

  return stringToReturn;
}

function listMixedEvents(artisticEvents, seminars){
  var stringToReturn = "";
  var indexArt = 0;
  var indexSem = 0;
  //console.log("artisticEvents.length = " + artisticEvents.length);
  //console.log("seminars.length = " + seminars.length);
  while(indexArt < artisticEvents.length && indexSem < seminars.length){
    if(artisticEvents[indexArt].dateAndTime <= seminars[indexSem].dateAndTime){
      stringToReturn += artisticEventInList(artisticEvents[indexArt], true);
      indexArt++;
      //console.log("ART: indexArt = " + indexArt + ", indexSem = " + indexSem);
    }
    else{
      stringToReturn += seminarInList(seminars[indexSem], true);
      indexSem++;
      //console.log("SEM: indexArt = " + indexArt + ", indexSem = " + indexSem);
    }
  }
  /*
    once one of the two lists is completely iterated, finish
    the iteration of the other
  */
  while(indexArt < artisticEvents.length){
    stringToReturn += artisticEventInList(artisticEvents[indexArt], true);
    indexArt++;
  }
  while(indexSem < seminars.length){
    stringToReturn += seminarInList(seminars[indexSem], true);
    indexSem++;
  }
  return stringToReturn;
}
function myReservations(/*TODO*/){
/*TODO: for myReservations (so showType = true).
        It is VERY DIFFERENT from the others because
        it also displays the date (not only time)
*/
}
