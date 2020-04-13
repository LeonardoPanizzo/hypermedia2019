//Scripts and functions for the toolbar.

$(document).ready(function(){
  //show what must be shown based on the fact the user is logged in or not
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

/*make the menu for mobile disappear when the user widens the screen enough
  to go to the normal view with colored buttons etc */
window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 74em)").matches) {
        var menuToHide = document.getElementById("menu_mobile");
        var checkBox = document.getElementById("toggle");
        menuToHide.style.display = "none";
        checkBox.checked = false;
    }
});

//Logout button listener
$(".logout_button").click(function(){
  $.ajax({
    url:DOMAIN_ADDRESS+'/user/logout',
    type:'DELETE',
    data:{
    },
    dataType:'json',
  })
  alert('Logged out');
  window.location.assign(DOMAIN_ADDRESS);

})
