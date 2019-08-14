//DEPRECATED
/*
//load the toolbar
$(function(){
    $("#toolbar_html").load("../pages/toolbar.html");
});*/

$(document).ready(function(){
  if(document.cookie){
    alert('you are already logged in');
    window.location.replace(DOMAIN_ADDRESS);
  }
})

$("#out").click(function(){
    $.ajax({
      url:DOMAIN_ADDRESS+'/user/print',
      type:'POST',
      data:{
      },
      dataType:'json',
      success:(data)=>{
        console.log(data);
      },
    })
});

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
        'name':email,
        'pass':pass
      },
      dataType: 'json',
      success:(data)=>{
        if(data.length===1){
          alert('logged in');
          window.location.replace(DOMAIN_ADDRESS);
        }else{
          alert('mail or password incorrect');
        }
      },
    });
  }
});
