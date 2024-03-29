//Script for the signup page.
$(document).ready(function(){
  /*
  Check the user is not already logged:
  in that case, send them on the home page.
  */
  if(document.cookie){
    alert('you are already logged in');
    window.location.replace(DOMAIN_ADDRESS);
  }
})

// When the user clicks to confirm the operation
$("#buttonSignUp").click(function(){
  let email=$("#email").val();
  email=email.toLowerCase();
  let pass=$("#pass").val();
  let name=$("#name").val();
  if(email.length===0 || pass.length===0 || name.length===0){
    alert('Insert all the required data');
  }
  else{
    $.ajax({
      url:DOMAIN_ADDRESS + '/user/signup',
      type: 'POST',
      data:{
        'mail':email,
        'password':pass,
        'name':name
      },
      dataType: 'json',
      success:(data)=>{
        if(!data.message){ //failure sign up
        alert(email + ' is already registered!');
      }
      else{ //signed up successfully
        $.ajax({
          url:DOMAIN_ADDRESS + '/user/login',
          type: 'POST',
          data:{
            'mail':email,
            'pass':pass
          },
          dataType: 'json',
          success:(data)=>{
            if(data.loggedin){
              alert('registered');
              window.location.replace(DOMAIN_ADDRESS);
            }
            else{
              alert('Something went wrong');
              window.location.replace(window.location.href);
            }
          },
        });

}}})}


})
