/*
  If it isArtisticEvent = false => the event is a seminar.
  showType is a boolean.
*/
function eventInList(event, isArtisticEvent, showType, showDate){
  var urlEvent;
  if(isArtisticEvent){
    urlEvent = getUrlArtisticEvent(event.idevent);
  }
  else{//seminar
    urlEvent = getUrlSeminar(event.idseminar);
  }
  var stringToReturn =
    "<p><a href='" + urlEvent + "'>" + event.title +
    "</a></p>" +
    "<p class='simpler_p'>(";
  if(showType){ //write type if requested
    if(isArtisticEvent){
      stringToReturn += event.type;
    }
    else{//seminar
      stringToReturn += "seminar";
    }
    stringToReturn += " - ";
  }
  if(showDate){
    stringToReturn += getFullDate(event.dateAndTime) + " at ";
  }
  stringToReturn +=
    getTime(event.dateAndTime) + ")" +
    "</p>";

  return stringToReturn;
}

/*
  showType is a boolean.
*/
function artisticEventInList(event, showType, showDate){
  return eventInList(event, true, showType, showDate);
}

/*
  showType is a boolean.
*/
function seminarInList(event, showType, showDate){
  return eventInList(event, false, showType, showDate);
}

/*
  Return string to append with list of events if not empty,
  otherwise return a string that represents an empty list.
  "areArtisticEvents" is a boolean (if false => list of seminars).
*/
function listEventsOrEmptySign(events, areArtisticEvents, showType, emptySignIsWordNone){
  if(events.length === 0){
    var emptySign;
    if(emptySignIsWordNone){
      emptySign = "none";
    }
    else{
      emptySign = "<p class='dash_for_empty_sign'>-</p>";
    }
    return "<br><p class='empty_sign_style'>" + emptySign + "</p>"; //empty list sign
  }
  else{//show date is false because this will always be below a date heading
    return listEvents(events, areArtisticEvents, showType, false);
  }
}

//Require events.length != 0
function listEvents(events, areArtisticEvents, showType, showDate){
  var stringToReturn = "<div class=marg_top_M>";
  for(var i in events){
    if(areArtisticEvents){
      stringToReturn += artisticEventInList(events[i], showType, showDate);
    }
    else {
      stringToReturn += seminarInList(events[i], showType, showDate);
    }
  }
  stringToReturn += "</div>"
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
    artisticEvents = artisticEvents.slice(artEventsInDay.length);
    seminars = seminars.slice(seminarsInDay.length);
    //what to display
    stringToReturn += titleDay(day);
    if(showArtAndSeminSeparate){
      stringToReturn += artisticEventsAndSeminarsSeparately(artEventsInDay, seminarsInDay, true);
    }
    else{
      stringToReturn += listMixedEvents(artEventsInDay, seminarsInDay, false);
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
      return getShortDate(seminars[0].dateAndTime);
    }
  }
  else{//artistic events not empty
    if(seminars.length === 0){//artistic events only not empty
      return getShortDate(artisticEvents[0].dateAndTime);
    }
    else{//both arrays not empty
      if(artisticEvents[0].dateAndTime < seminars[0].dateAndTime){
        return getShortDate(artisticEvents[0].dateAndTime);
      }
      else{
        return getShortDate(seminars[0].dateAndTime);
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
  for(i=0; i < events.length && getShortDate(events[i].dateAndTime) === day; i++);

  return events.slice(0,i);
}

//day is not a timestamp but is a getShortDate(timestamp)
function titleDay(day){
  stringToReturn =
    "<div class='medium_header'>" +
      "Day: " + day +
    "</div>";

  return stringToReturn;
}


function sameTypeListEventsDivByDay(events, areArtisticEvents){
  var stringToReturn = "";
  var day;
  var eventsInDay;
  while(events.length > 0){
    day = getShortDate(events[0].dateAndTime); //first day in list
    eventsInDay = eventsInSpecifiedDay(events, day);
    //remove extracted events from 'events'
    events = events.slice(eventsInDay.length);
    //what to display
    stringToReturn += titleDay(day);
    stringToReturn += listEvents(eventsInDay, areArtisticEvents, false, false);
  }
  return stringToReturn;
}

/*
  Artistic events and seminars will be displayed separate.
*/
function artisticEventsAndSeminarsSeparately(artisticEvents, seminars, showTypeArtEv) {
  const COLUMN = "<div class='col-sm-6'>";
  //first: list of artistic events
  //the header:
  var stringToReturn =
    "<div class='container row'>" +
      COLUMN +
        "<div class='small_header'>Artistic Events" +
        "</div>";
  //then the actual list:
  stringToReturn +=
        listEventsOrEmptySign(artisticEvents, true, showTypeArtEv, false) +
      "</div>"; //to close COLUMN
  //then: list of seminars
  //the header:
  stringToReturn +=
      COLUMN +
        "<div class='small_header'>Seminars" +
        "</div>";
  //then the actual list:
  stringToReturn += listEventsOrEmptySign(seminars, false, false, false) +
      "</div>" + //to close COLUMN
    "</div>"; //to close container row
  return stringToReturn;
}


function listMixedEvents(artisticEvents, seminars, showDate){
  var stringToReturn = "";
  var indexArt = 0;
  var indexSem = 0;
  while(indexArt < artisticEvents.length && indexSem < seminars.length){
    if(artisticEvents[indexArt].dateAndTime <= seminars[indexSem].dateAndTime){
      stringToReturn += artisticEventInList(artisticEvents[indexArt], true, showDate);
      indexArt++;
    }
    else{
      stringToReturn += seminarInList(seminars[indexSem], true, true, showDate);
      indexSem++;
    }
  }
  /*
    once one of the two lists is completely iterated, finish
    the iteration of the other
  */
  while(indexArt < artisticEvents.length){
    stringToReturn += artisticEventInList(artisticEvents[indexArt], true, showDate);
    indexArt++;
  }
  while(indexSem < seminars.length){
    stringToReturn += seminarInList(seminars[indexSem], true, showDate);
    indexSem++;
  }
  return stringToReturn;
}
