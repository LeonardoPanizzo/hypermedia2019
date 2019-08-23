$(document).ready(function(){
  $.get( DOMAIN_ADDRESS + "/performer/all" , function(allPerformers){
    for(performer of allPerformers){
      $('#allPerformers').append(
        "<div class='medium_header'>"+
          "<a href='" + getUrlPerformer(performer.idperformer) + "'>" +
          performer.name +
        "</a></div>" +
        "<p class='container center-block col-sm-7'>"+performer.details.substring(0,100)+
        "...</p></div>"
      );
    }
  });
})

/*
$('#allAuthors').append("<div>"+
"<p class='names_list_authors'>"+
"<a href=https://hypermedia123456.herokuapp.com/pages/author.html?"+data[i].idauthor+">"+ data[i].name +
"</a></p>"+
"<img id='big_image_list' src='../assets/img/author/"+data[i].idauthor+".jpg' alt='"+data[i].name+"'>"+
"<p class='container center-block col-sm-7'>"+data[i].biography.substring(0,100)+
"...</p></div>");
*/
