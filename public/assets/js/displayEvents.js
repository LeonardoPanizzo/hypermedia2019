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


function listEventsDivByDay(artisticEvents, seminars, showType, showArtAndSeminSeparate){
  var stringToReturn = "";
  var day;
  var artEventsInDay;
  var seminarsInDay;
  while(artisticEvents.length != 0 || seminars.length != 0){
    day = firstDayInLists(artisticEvents, seminars);
    artEventsInDay = eventsInSpecifiedDay(artisticEvents, day);
    seminarsInDay = eventsInSpecifiedDay(seminars, day);
    //cut the extracted days from 'artisticEvents' and 'seminars'
    artisticEvents = artisticEvents.slice(artEventsInDay.length, artisticEvents.length);
    seminars = seminars.slice(seminarsInDay.length, seminars.length);
    //what to display
    stringToReturn += titleDay(day);
    if(showArtAndSeminSeparate){
      stringToReturn += artisticEventsAndSeminarsSeparately(artEventsInDay, seminarsInDay, true);
    }
    else{
      stringToReturn += listMixedEvents(artEventsInDay, seminarsInDay);
    }
  }

  return stringToReturn;
}

//Require both arrays ordered by date.
//Return null if both arrays are empty.
function firstDayInLists(artisticEvents, seminars){
  if(artisticEvents.length === 0){
    if(seminars.length === 0){
      return null;
    }
    else{//artisticEvents empty, seminars not empty
      return getDate(seminars[0].dateAndTime);
    }
  }
  else{//artistic events not empty
    if(seminars.length === 0){//artistic events only not empty
      return getDate(artisticEvents[0].dateAndTime);
    }
    else{//both arrays not empty
      if(artisticEvents[0].dateAndTime < seminars[0].dateAndTime){
        return getDate(artisticEvents[0].dateAndTime);
      }
      else{
        return getDate(seminars[0].dateAndTime);
      }
    }
  }
}

/*
Require events to be ordered by date with
first day not previous to the parameter 'day'.
It can return empty array.
*/
function eventsInSpecifiedDay(events, day){
  var i;
  for(i=0; i < events.length && getDate(events[i].dateAndTime) === day; i++);

  return events.slice(0,i);
}

//day is not a timestamp but is a getDate(timestamp)
function titleDay(day){
  stringToReturn =
    "<div class='medium_header'>" +
      day +
    "</div>";

  return stringToReturn;
}


function sameTypeListEventsDivByDay(events, areArtisticEvents){
  //TODO: (showType = false)

}

/*
  Artistic events and seminars will be displayed separate.
*/
function artisticEventsAndSeminarsSeparately(artisticEvents, seminars, showType) {
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
  while(indexArt < artisticEvents.length && indexSem < seminars.length){
    if(artisticEvents[indexArt].dateAndTime <= seminars[indexSem].dateAndTime){
      stringToReturn += artisticEventInList(artisticEvents[indexArt], true);
      indexArt++;
    }
    else{
      stringToReturn += seminarInList(seminars[indexSem], true);
      indexSem++;
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
