const DOMAIN_ADDRESS = 'http://localhost:3000';
//const DOMAIN_ADDRESS = 'https://hypermdia-magatti-panizzo.herokuapp.com';

//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});

/*TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
I should put this ONLY in the pages when it is needed!!!!!
//for CAROUSEL: to avoid auto-sliding after click when its unwanted
$('.noAutoSliding').carousel({
  interval: false
});*/

//works properly with both timestamp and date
function getDate(timestamp){

  var dateAndTime = new Date(timestamp);

  var day = dateAndTime.getDate();
  //+1 because it would start from 0 otherwise (jenaury 0, february 1, ...)
  var month = dateAndTime.getMonth() + 1;
  var year = dateAndTime.getFullYear();

  var date = day + "/" + month + "/" + year;

  return date;
}


function getTime(timestamp){

  var dateAndTime = new Date(timestamp);

  var hour = dateAndTime.getHours();
  var minutes = dateAndTime.getMinutes();

  var time = hour + ":" + minutes;

  return time;
}
