//DEPRECATED
/*
//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});*/

/*$(document).ready(function(){
  if(document.cookie){
    alert('you are already logged in');
    window.location.replace(DOMAIN_ADDRESS);
  }
})*/


$("#button").click(function(){
  let email=$("#email").val();
  email=email.toLowerCase();
  let pass=$("#pass").val();
  if(email.length===0 || pass.length===0){
    alert('Insert all the required data');
  }else{
    console.log(email);
    console.log(pass);
    $.ajax({
      url: DOMAIN_ADDRESS+'/user/login',
      type: 'POST',
      data:{
        'mail':email,
        'pass':pass
      },
      dataType: 'json',
      /*success:(data)=>{
        if(document.cookie){
          console.log('here2');
          alert('logged in');
          window.location.replace(DOMAIN_ADDRESS);
        }else{
          console.log('here3');
          alert('mail or password incorrects');
          window.location.replace(DOMAIN_ADDRESS+'/pages/login.html');
        }
      }*/
    })/*.then(
      function(){
        if(document.cookie){
          alert('Logged in');
          window.location.replace(DOMAIN_ADDRESS);
        }
        else{
          alert('Wrong email or password!');
      }
    });*/
    //TODO: test if it works properly!!!
    /*
    if(document.cookie){
      alert('Logged in');
      window.location.replace(DOMAIN_ADDRESS);
    }
    else{
      alert('Wrong email or password!');
    }*/
    //window.location.replace(window.location.href);
    //window.location.replace(DOMAIN_ADDRESS);
  }
  //TODO: test if it works properly!!!
  //it works only at the second attempt to connect!! Why?
  /*
  if(document.cookie){
    alert('Logged in');
    window.location.replace(DOMAIN_ADDRESS);
  }
  else{
    alert('Wrong email or password!');
  }*/
  //window.location.replace(window.location.href);
})
