//DEPRECATED
/*
//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});*/

// TODO: uncomment this part when it is on the server
//this part should be commented while using the site on localhost

$(document).ready(function(){
  let ad=window.location.href;
  ad=ad.substring(4,5);
  if(ad!='s'){
    window.location.replace(DOMAIN_ADDRESS);
  }
})
