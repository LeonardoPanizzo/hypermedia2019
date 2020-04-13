/*
File containing functions for displaying of events in different ways.
*/

/*
Rerturns html code as a string representing an event in a list of events.

Parameters:
  event: event object retrieved from the database
  isArtisticEvent: boolean that indicates if the event is an artistic event. if
              it is false, this means the event is a seminar
  showType: boolean that indicates if the type of the event should be shown
  showDate: boolean that indicates if the date of the event should be shown
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
Rerturns html code as a string representing an artistic event in a list of
events.

Parameters:
  event: artistic event object retrieved from the database
  showType: boolean that indicates if the type of the event should be shown
  showDate: boolean that indicates if the date of the event should be shown
*/
function artisticEventInList(event, showType, showDate){
  return eventInList(event, true, showType, showDate);
}

/*
Rerturns html code as a string representing a seminar in a list of
events.

Parameters:
  event: seminar object retrieved from the database
  showType: boolean that indicates if the type of the seminar should be shown
  showDate: boolean that indicates if the date of the seminar should be shown
*/
function seminarInList(event, showType, showDate){
  return eventInList(event, false, showType, showDate);
}

/*
Returns html code a string with list of events if not empty, otherwise return a
string readable for users that represents an empty list.
The events must be all artistic events or all seminars.

Parameters:
    events: array of events as objects retrieved from the database
    areArtisticEvents: boolean that is true if all the events are artistic
          events, false if they are all seminars
    showType: boolean that indicates if the type of the events should be shown
    emptySignIsWordNone: boolean that is true if the empty list should be
          represented with the word "none", false if the sign to use is "_"
*/
function listEventsOrEmptySign(events, areArtisticEvents, showType, emptySignIsWordNone){
  if(events.length === 0){
    var emptySign;
    if(emptySignIsWordNone){
      emptySign = "none";
    }
    else{
      emptySign = "_";
    }
    return "<br><p class='empty_sign_style'>" + emptySign + "</p>"; //empty list sign
  }
  else{//show date is false because this will always be below a date heading
    return listEvents(events, areArtisticEvents, showType, false);
  }
}

/*
Returns html code as string representing a list of events.

Parameters:
  events: non-empty array of events as objects retrieved from the database
  areArtisticEvents:  boolean that is true if all the events are artistic
        events, false if they are all seminars
  showType: boolean that indicates if the type of the events should be shown
  showDate: boolean that indicates if the date of the event should be shown
*/
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

/*
Returns html code as string representing a list of events divided by day,
with the indication of the day of each subgroup of events.

Parameters:
  artisticEvents: array of artistic events in the form of objects retrieved from
        the database
  seminars: array of seminars in the form of objects retrieved from the database
  showType: boolean that indicates if the type of the events should be shown
  showArtAndSeminSeparate: boolean that indicates if artistic events and
        seminars should be shown separately or not
*/
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
/*
Given an array of artistic events and one of seminars, both ordered by date,
returns the first date in chronological order, if there is one.
Returns null if both arrays are empty.

Parameters: array of artistic events in the form of objects retrieved by
    the database, ordered by date
  artisticEvents: array of seminars in the form of objects retrieved by
      the database, ordered by date
*/
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
Given a day written as 'number_day/number_month' and an array of events, with
the events ordered by date and the date of the first event equal or successive
to the date of the day specified as parameter, returns an array containing
the events in that day; if there are none, returns an empty array.

Parameters:
  events: array of events of the same type in the form of objects retrieved
        from the database
  day: date in the form of 'number_day/number_month'
*/
function eventsInSpecifiedDay(events, day){
  var i;
  for(i=0; i < events.length && getShortDate(events[i].dateAndTime) === day; i++);

  return events.slice(0,i);
}

/*
Reutrns html code as a string representing the header of a date, meant to
be used before a list of events in that date.

Parameters:
  day: date written as a string (not a timestamp)
*/
function titleDay(day){
  stringToReturn =
    "<div class='medium_header'>" +
      "Day: " + day +
    "</div>";

  return stringToReturn;
}

/*
Returns html code as string representing a list of events of the same type,
ordered by date.

Parameters:
  events: array of events of the same type in the form of objects retrieved
        from the database
  areArtisticEvents: boolean that is true if the events are artistic events,
        false if they are seminars
*/
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
Returns html code as string representing a list of events, ordered by date,
with artistic events and seminars divided in two separate columns.

Parameters:
  artisticEvents: array of artistic events in the form of objects retrieved from
        the database
  seminars: array of seminars in the form of objects retrieved from the database
  showTypeArtEv: boolean that indicates if the type of each artistic has
        to be specified
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

/*
Returns html code as string representing a list of events, ordered by date.

Parameters:
  artisticEvents: array of artistic events in the form of objects retrieved from
        the database
  seminars: array of seminars in the form of objects retrieved from the database
  showDate: boolean that indicates if the date of the event should be shown
*/
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
