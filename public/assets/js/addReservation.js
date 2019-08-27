//DEPRECATED
function buttonGetReservation(){
  var stringToReturn =
  "<button class='btn btn-success btn-lg' role='button' id='buttonGetReservation'>" +
    "Reserve ticket!" +
  "</button>";
  return stringToReturn;
}

$("#buttonGetReservation").click(function(){
  if(document.cookie){
    console.log("TODO!!!!!");
  }
  else{
    alert("You should log in first!");
    window.location.assign( DOMAIN_ADDRESS + "/pages/login.html");
  }
});
