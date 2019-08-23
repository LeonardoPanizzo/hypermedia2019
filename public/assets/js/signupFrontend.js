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

$("#buttonSignUp").click(function(){
  let email=$("#email").val();
  email=email.toLowerCase();
  let pass=$("#pass").val();
  let name=$("#name").val();
  if(email.length===0 || pass.length===0 || name.length===0){
    alert('Insert all the required data');
  }else{$.ajax({
    url: DOMAIN_ADDRESS + '/user/check',
    type: 'POST',
    data:{
      'mail':email,
    },
    dataType: 'json',
    success:(data)=>{
      if(data.length===1){
        alert(email+' is already registered!');
    }else if(data.length===0){
      $.ajax({
        url:DOMAIN_ADDRESS + '/user/signup',
        type: 'POST',
        data:{
          'mail':email,
          'password':pass,
          'name':name,
        },
        dataType:'json',
        success:(data)=>{
          $.ajax({
            url:DOMAIN_ADDRESS + '/user/login',
            type: 'POST',
            data:{
              'mail':email,
              'pass':pass
            },
            dataType: 'json',
            success:(data)=>{
              if(data.length!=0){
                alert('registered');
                window.location.replace(DOMAIN_ADDRESS);
              }else{
                alert('Something went wrong');
                window.location.replace(DOMAIN_ADDRESS);
              }
            },
          });
        }
})

}}})}


})
