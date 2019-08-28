//const DOMAIN_ADDRESS = 'http://localhost:3000';
const DOMAIN_ADDRESS = 'https://hypermdia-magatti-panizzo.herokuapp.com';

//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});

//if https is not set, set https
if(location.protocol != 'https:'){
  window.location.replace(window.location.href.replace("http://", "https://"));
}

//Return string with capitalized first letters
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getShortDate(timestamp){
  return getDate(timestamp, false);
}

function getFullDate(timestamp){
  return getDate(timestamp, true);
}

//works properly with both timestamp and date
//show year is a boolean
function getDate(timestamp, showYear){

  var dateAndTime = new Date(timestamp);

  var day = dateAndTime.getDate();
  //+1 because it would start from 0 otherwise (jenaury 0, february 1, ...)
  var month = dateAndTime.getMonth() + 1;
  //short date (without year)
  var date = day + "/" + month;

  if(showYear){
    date += "/" + dateAndTime.getFullYear();
  }

  return date;
}


function getTime(timestamp){

  var dateAndTime = new Date(timestamp);

  var hour = dateAndTime.getHours();
  var minutes = dateAndTime.getMinutes();
  //make two digits for minutes in case it is only one
  if(minutes < 10)
    minutes = "0" + minutes;

  var time = hour + ":" + minutes;

  return time;
}


function getUrlArtisticEvent(id){
  return DOMAIN_ADDRESS + "/pages/artisticEvent.html?" + id;
}

function getUrlSeminar(id){
  return DOMAIN_ADDRESS + "/pages/seminar.html?" + id;
}

function getUrlPerformer(id){
  return DOMAIN_ADDRESS + "/pages/performer.html?" + id;
}

function getIdFromUrlBeforeQuestionMark(urlBeforeQuestionMark){
  let indexStartId = (urlBeforeQuestionMark + "?").length;
  return (window.location.href).substring(indexStartId);
}

//for multiple topics
function orientationInfoAndTitle(multipleTopic, nameOfSpecificTopic){
  var stringToReturn =
    "<h2 class='big_large_header marg_top_S'>" + multipleTopic + " :" +
    "</h2>" +
    "<h1 class='big_large_header'>" + nameOfSpecificTopic +
    "</h1>";
  return stringToReturn;
}

function carouselForMTopics(srcImages, infoForBlindPeople){

  //for first picture to be shown
  const DIV_ACTIVE = "<div class='carousel-item active'>";
  //for all the others
  const DIV_NON_ACTIVE = "<div class='carousel-item'>";
  var stringToReturn =
    "<div id='carouselMTopic' class='container col-sm-8 marg_top_M carousel slide' data-ride='carousel'>" +
       "<div class='carousel-inner imgCarouselMTopic'>";
  for(var i = 1; i <= 3; i++){
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

function dateTimePlaceInfo(event){
  var dateAndTime = event.dateAndTime;
  var stringToReturn =
    "<p>" + getFullDate(dateAndTime) + " at " + getTime(dateAndTime) +
    "</p>" +
    "<p>" + event.place + "</p>";
  return stringToReturn;
}

function descriptionForEvent(description){
  var stringToReturn =
    "<div class='small_header'>Description</div>" +
    "<p>" + description + "</p>";
  return stringToReturn;
}
