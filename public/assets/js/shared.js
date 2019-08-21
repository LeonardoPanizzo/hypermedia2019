const DOMAIN_ADDRESS = 'http://localhost:3000';
//const DOMAIN_ADDRESS = 'https://hypermdia-magatti-panizzo.herokuapp.com';

//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});
/*
$(function(){
  const HTTPS = "https";
  let address=window.location.href;
  if(address.substring(0,5) != HTTPS){
    let safeAddress = HTTPS + address.substring(4);
    window.location.replace(safeAddress);
  }
});*/
/*if the above doesn't work:
$(document).ready(function(){
  const HTTPS = "https";
  let address=window.location.href;
  if(address.substring(0,5) != HTTPS){
    let safeAddress = HTTPS + address.substring(4);
    window.location.replace(safeAddress);
  }
});*/
/* if the above does not work:
$(document).ready(function(){
  let ad=window.location.href;
  ad=ad.substring(4,5);
  if(ad!='s'){
    window.location.replace("https" + address.substring(4));
  }
})*/

/*TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
I should put this ONLY in the pages when it is needed!!!!!
//for CAROUSEL: to avoid auto-sliding after click when its unwanted
$('.noAutoSliding').carousel({
  interval: false
});*/
//Return string with capitalized first letters
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//works properly with both timestamp and date
function getDate(timestamp){

  var dateAndTime = new Date(timestamp);

  var day = dateAndTime.getDate();
  //+1 because it would start from 0 otherwise (jenaury 0, february 1, ...)
  var month = dateAndTime.getMonth() + 1;
  //var year = dateAndTime.getFullYear();

  //var date = day + "/" + month + "/" + year;
  var date = day + "/" + month;

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
/*//it does not work and we still don't know why
function queryC(type, pathQueryAfterDomain){
  var result;
  $.ajax({
    url : DOMAIN_ADDRESS + "/" + pathQueryAfterDomain,
    type : type,
    success:(data)=>{
      result = data;
      //return data;
    },
  }).then(function(){
    return result;
  });
}*/
