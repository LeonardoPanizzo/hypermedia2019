/*
  whereToAppend is '#idName' or '.className'.
  If it isArtisticEvent = false => the event is a seminar.
  dispalyType is a boolean.
*/
function displayEventInList(event, whereToAppend, isArtisticEvent, dispalyType){
  var urlEvent;
  if(isArtisticEvent){
    urlEvent = getUrlArtisticEvent(event.idevent);
  }
  else{//seminar
    urlEvent = getUrlSeminar(event.idseminar);
  }
  var stringToAppend =
    "<a href='" + urlEvent + "'>" + event.title +
    "</a>" +
    "<p>( ";
  if(dispalyType){ //write type if requested
    if(isArtisticEvent){
      stringToAppend += event.type;
    }
    else{//seminar
      stringToAppend += "seminar";
    }
    stringToAppend += " - ";
  }
  stringToAppend +=
    getTime(event.timeAndDate) + ")" +
    "</p>";

  $(whereToAppend).append(stringToAppend);
}

/*
  whereToAppend is '#idName' or '.className'.
  dispalyType is a boolean.
*/
function displayArtisticEventInList(event, whereToAppend, dispalyType){
  displayEventInList(event, whereToAppend, true, dispalyType);
}

/*
  whereToAppend is '#idName' or '.className'.
  dispalyType is a boolean.
*/
function displaySeminarInList(event, whereToAppend, dispalyType){
  displayEventInList(event, whereToAppend, false, dispalyType);
}
