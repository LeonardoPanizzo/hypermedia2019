$(document).ready(function(){
  if(document.cookie){
    alert('you are already logged in');
    window.location.replace(DOMAIN_ADDRESS);
  }
})

$("#buttonLogin").click(function(){
  let email=$("#email").val();
  email=email.toLowerCase();
  let pass=$("#password").val();
  if(email.length===0 || pass.length===0){
    alert('Insert all the required data');
  }else{
    $.ajax({
      url: DOMAIN_ADDRESS+'/user/login',
      type: 'POST',
      data:$("#loginform").serialize(),
      success:(data)=>{
        if(data.loggedin){
          alert('logged in');
          window.location.replace(DOMAIN_ADDRESS);
        }else{
          alert('email or password incorrect!');
        }
      }
    })
  }
})
