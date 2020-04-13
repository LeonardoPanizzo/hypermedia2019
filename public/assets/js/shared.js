/*
  This file contains constants and functions shared by
  different sources and also the scripts that must be
  present in all the web pages.
*/
const DOMAIN_ADDRESS = 'https://hypermdia-magatti-panizzo.herokuapp.com';
//for localhost testing:
//const DOMAIN_ADDRESS = 'http://localhost:3000';

//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});

//If https is not set, sets https
//Warning: this function is only for the real website;
//          so it must be commented during localhost testing.
if(location.protocol != 'https:'){
  window.location.replace(window.location.href.replace("http://", "https://"));
}

//Returns string with capitalized first letters
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Returns date as 'number_day/number_month'
function getShortDate(timestamp){
  return getDate(timestamp, false);
}

//Returns date as 'number_day/number_month/year'
function getFullDate(timestamp){
  return getDate(timestamp, true);
}

/*
Given a string representing a number greater than or
equal to zero, if the string is longer than one character
and the first character is a zero, returns a string
representing the same number without the first character;
returns a string equal to the parameter otherwise.

Parameters:
  string: string representing a number
          greater that or equal to zero
*/
function removeZeroAsFirstDigitIfPresent(string){
  var tmpStr = string;
  if(tmpStr.charAt(0) == '0' && tmpStr.length > 1){
    tmpStr = tmpStr.substring(1);
  }
  return tmpStr;
}

/*
Returns the date as a string in a readable format for users.

Parameters:
  timestamp: the timestamp of the date
  showYear: booelan to indicate if the year
            of the date should be shown
*/
function getDate(timestamp, showYear){
  //timestamp format is like: 2019-09-05T18:00...
  var day = timestamp.substring(8, 10);

  var month = timestamp.substring(5, 7);

  day = removeZeroAsFirstDigitIfPresent(day);
  month = removeZeroAsFirstDigitIfPresent(month);

  var date = day + "/" + month;

  if(showYear){
    date += "/" + timestamp.substring(0, 4);
  }

  return date;
}

//Returns time as a string in a readable format for users.
function getTime(timestamp){
  //timestamp fromat is like: 2019-09-05T18:00...
  var time = timestamp.substring(11, 16);

  time = removeZeroAsFirstDigitIfPresent(time);

  return time;
}

//Returns the url of page of the artistic event with the specified id.
function getUrlArtisticEvent(id){
  return DOMAIN_ADDRESS + "/pages/artisticEvent.html?" + id;
}

//Returns the url of page of the seminar with the specified id.
function getUrlSeminar(id){
  return DOMAIN_ADDRESS + "/pages/seminar.html?" + id;
}

//Returns the url of page of the performer with the specified id.
function getUrlPerformer(id){
  return DOMAIN_ADDRESS + "/pages/performer.html?" + id;
}

/*
Returns the identifier of the specific object of interest of
the current page, assuming that the url of the current page
ends with this identifier, preceded by a question mark.
*/
function getIdFromUrl(){
  //assume that the url of the page could contain more than one question mark
  //get the postion of the last question mark
  var url = window.location.href;
  //find the last occurrence as the first occurence backwards
  for (var i = url.length - 1; i >= 0; i--){
    if(url.charAt(i) == '?'){
      //return id: the substring starting from the character after the last '?'
      return url.substring(i+1);
    }
  }
}

/*
Returns html code as a string with orientation info of the web page and
the name of the specific topic the page is about.

Parameters:
  multipleTopic: info about the kind of topic (artistic event, seminar etc)
  nameOfSpecificTopic: name of the specific topic, for example, name of that
                    specific artistic
*/
function orientationInfoAndTitle(multipleTopic, nameOfSpecificTopic){
  var stringToReturn =
    "<h2 class='big_large_header marg_top_S'>" + multipleTopic + " :" +
    "</h2>" +
    "<h1 class='big_large_header'>" + nameOfSpecificTopic +
    "</h1>";
  return stringToReturn;
}

/*
Returns html code as a string representing the carousel of pictures for a
specific page, TODO

Parameters:
  srcImages: string representing the name folder where the pictures are located,
            including the relative path in the form of 'folder1/folder2/folder3'
  infoForBlindPeople: information about the picture to describe it to blind
                      people
*/
function carouselForMTopics(srcImages, infoForBlindPeople){
  //assume photos are named as 1.jpg, 2.jpg, ..., n.jpg
  //for first picture to be shown
  const DIV_ACTIVE = "<div class='carousel-item active'>";
  //for all the others
  const DIV_NON_ACTIVE = "<div class='carousel-item'>";
  var stringToReturn =
    "<div id='carouselMTopic' class='container col-sm-8 marg_top_M carousel slide' data-ride='carousel'>" +
       "<div class='carousel-inner imgCarouselMTopic'>";
  for(var i = 1; urlExists(srcImages + "/" + i + ".jpg"); i++){
    if(i > 1){
      stringToReturn += DIV_NON_ACTIVE;
    }
    else{
      stringToReturn += DIV_ACTIVE;
    }
    stringToReturn +=
          "<img class='d-block w-100' src='" + srcImages + "/" + i + ".jpg' " +
            "alt='Slide number " + i + " representing the " + infoForBlindPeople + "'>" +
        "</div>";
  }
  stringToReturn +=
      "</div>" +
       "<a class='carousel-control-prev' href='#carouselMTopic' role='button' data-slide='prev'>" +
         "<span class='carousel-control-prev-icon' aria-hidden='true'></span>" +
         "<span class='sr-only'>Previous</span>" +
       "</a>" +
       "<a class='carousel-control-next' href='#carouselMTopic' role='button' data-slide='next'>" +
         "<span class='carousel-control-next-icon' aria-hidden='true'></span>" +
         "<span class='sr-only'>Next</span>" +
       "</a>" +
     "</div>";

   return stringToReturn;
}

/*
Returns true if the resource called with the given url address exists,
false otherwise.
*/
function urlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

/*
Returns html code as string representing the information about date, time
and location of a specific event.

Parameters:
  event: data representing the entity event, retrieved from the database
*/
function dateTimePlaceInfo(event){
  var dateAndTime = event.dateAndTime;
  var stringToReturn =
    "<p>" + getFullDate(dateAndTime) + " at " + getTime(dateAndTime) +
    "</p>" +
    "<p>" + event.place + "</p>";
  return stringToReturn;
}

/*
Returns html code as a string representing the description for an event,
including the header to indicate its a description.
*/
function descriptionForEvent(description){
  var stringToReturn =
    "<div class='small_header'>Description</div>" +
    "<p>" + description + "</p>";
  return stringToReturn;
}
