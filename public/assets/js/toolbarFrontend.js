$(document).ready(function(){
  /*DEPRECATED
  var logged=document.getElementById("logged");
  var notlog=document.getElementById("notlog");
  */
  if(document.cookie){ /* LOGGED IN */
    $('.logged').show();
  }else{ /* NOT LOGGED */
      $('.notlog').show();
  }

})


//show/hide the menu for mobile by clicking on the menu button
function menuForMobileOnClick() {
 var checkBox = document.getElementById("toggle");
 var menuToShow = document.getElementById("menu_mobile");
 if (checkBox.checked == true){
   menuToShow.style.display = "block";
 } else {
    menuToShow.style.display = "none";
 }
}

/*make the menu for mobile disappear when the user whidens the screen enough
  to go to the normal view with colored buttons etc */
window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 73em)").matches) {
        var menuToHide = document.getElementById("menu_mobile");
        var checkBox = document.getElementById("toggle");
        menuToHide.style.display = "none";
        checkBox.checked = false;
    }
});

$(".logout_button").click(function(){
  $.ajax({
    //logout request
    url : DOMAIN_ADDRESS + '/querylogin/TODO', //TODO
    type: 'POST',
  })
  alert('Logged out');
  window.location.replace(DOMAIN_ADDRESS);

})