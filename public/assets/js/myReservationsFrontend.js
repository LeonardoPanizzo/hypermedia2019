$(document).ready(function(){

  var artisticEvents;
  var seminars;

  $.get( DOMAIN_ADDRESS + "/cartArtisticEvent/", function(results, status){
    artisticEvents = results;
  }).then(function(){
    $.get( DOMAIN_ADDRESS + "/cartSeminar/", function(results, status){
      seminars = results;
    }).then(function(){
      $('#reservationList').append(
        //"<p>prova1</p>"
        cartResults(artisticEvents, seminars)
      );
  });
});
/*
$.ajax({//store the artistic events in the variable artisticEvents
  url : DOMAIN_ADDRESS + "/cartArtisticEvent/",
  type : 'GET',
  success:(data)=>{
    artisticEvents = data;
  },
}).then(//store the semiars in the variable semiars
  function(){
    $.ajax({
      url : DOMAIN_ADDRESS + "/cartSeminar/",
      type : 'GET',
      success:(data)=>{
        seminars = data;
      },
    }).then(
      function(){
        var stringToAppend;
        $('#eventsToday').append("<p>prova</p>");
    })
})*/
});


function cartResults(artisticEvents, seminars){
  var stringToReturn = "";
  var indexArt = 0;
  var indexSem = 0;
  while(indexArt < artisticEvents.length && indexSem < seminars.length){
    if(artisticEvents[indexArt].dateAndTime <= seminars[indexSem].dateAndTime){
      stringToReturn += artisticEventInReservations(artisticEvents[indexArt]);
      indexArt++;
    }
    else{
      stringToReturn += seminarInReservations(seminars[indexSem]);
      indexSem++;
    }
    return stringToReturn;
}

function artisticEventInReservations(artisticEvent){

}

function seminarInReservations(seminar){

}

function eventInReservations(event, isArtisticEvent){
  var urlEvent;
  if(isArtisticEvent){
    urlEvent = getUrlArtisticEvent(event.idevent);
  }
  else{//seminar
    urlEvent = getUrlSeminar(event.idseminar);
  }
  var stringToReturn =
    "<p><a href='" + urlEvent + "'>" + event.title +
    "</a></p>" +
    "<p class='simpler_p'>(";
    if(isArtisticEvent){
      stringToReturn += event.type;
    }
    else{//seminar
      stringToReturn += "seminar";
    }
    stringToReturn += " - ";
  stringToReturn +=
    getTime(event.dateAndTime) + ")" +
    "</p>";

  return stringToReturn;
}

/*
ESEMPIO: VECCHIO CARELLO DEL BOOKSTORE
$(function(){
    $("#toolbar_html").load("toolbar.html");
});

$(document).ready(function(){
  var y=document.cookie;
  var t=y.substring(7);
  var log=document.getElementById("log");
  var notlog=document.getElementById("notlog");

  if(!t){
    $('.hide_if_empty_cart_or_not_logged').hide();
    alert('you are not logged in');
    window.location.replace('https://hypermedia123456.herokuapp.com');
  }
  $.ajax({
    url:'https://hypermedia123456.herokuapp.com/queryuser/clean',
    type:'POST',
    data:{},
    dataType:'json',
  })
  $.get("https://hypermedia123456.herokuapp.com/queryuser/user/"+t, function(data, status){
    $('#userName').append("<div><p>"+data[0].name+"</p></div>")
    $('#userAddress').append("<div><p>"+data[0].address+"</p></div>")
  });
  $.get("https://hypermedia123456.herokuapp.com/queryuser/cart/"+t,function(data,status){
    if(data.length === 0){
      $('#car').append("<h2>Your cart is empty.</h2><br>"+
                       "<h4 id='click_here_cart'><a href='./research.html'>Click here</a> to find something interesting!</h4>")
      $('.hide_if_empty_cart_or_not_logged').hide();
    }
    //shipping cost
    var tot = 3.9;
    for(var i in data){
    $('#car').append(
        "<div class='row border_elem_in_list'>"+
          "<div class='col-sm-4 features_book_img_list'>"+
            "<img id='big_image_list' src='../assets/img/book/"+data[i].idbook+".jpg' alt='"+data[i].title+"'>"+
          "</div>"+
          "<div class='col-sm-4'>"+
            "<p class='medium_header'><a href=https://hypermedia123456.herokuapp.com/pages/book.html?"+data[i].idbook+">"+ data[i].title +"</a></p>"+
            "<p>by <a href=https://hypermedia123456.herokuapp.com/pages/author.html?"+data[i].idauthor+">"+ data[i].name +"</a></p>"+
            "<p>prize: "+data[i].prize+"€</p>"+
          "</div>"+
          "<div class='col-sm-4 center-block add_remove_btn_cart'>"+
            "<p>quantity: "+data[i].quantity+"</p>"+
            "<button id='remove"+data[i].idbook+"' class='inline big_enough_square_std_btn'><i class='material-icons'>remove_shopping_cart</i></button>"+
            "<button id='minus"+data[i].idbook+"' class='inline big_enough_square_std_btn'><i class='material-icons'>remove</i></button>"+
            "<button id='add"+data[i].idbook+"' class='inline big_enough_square_std_btn'><i class='material-icons'>add</i></button>"+
          "</div>"+
        "</div>");
      tot += parseInt(data[i].prize)*parseInt(data[i].quantity);
  }
  $('#totalCost').append("<p>Total: <b>"+ tot + "0€</b> (shipping included)</p>");
});
});

$('#trashcan').click(function(){
  if(window.confirm("Empty cart?")){
    var x=document.cookie;
    var k=x.substring(7);
    $.ajax({
      url:'https://hypermedia123456.herokuapp.com/queryuser/empty',
      type:'POST',
      data:{
        'iduser':k,
      },
      dataType:'json',
    })
    window.location.replace('https://hypermedia123456.herokuapp.com/pages/user.html');
  }
})

$('#confirm_order').click(function(){
  if(window.confirm("Procede with order?")){
    var x=document.cookie;
    var k=x.substring(7);
    $.ajax({
      url:'https://hypermedia123456.herokuapp.com/queryuser/empty',
      type:'POST',
      data:{
        'iduser':k,
      },
      dataType:'json',
    })
    alert('your order is being processed');
    window.location.replace('https://hypermedia123456.herokuapp.com/pages/user.html');
  }
})

$(document).on('click', "[id^=remove]", function(){
  var t=document.cookie.substring(7);
  var z=this.id.substring(6);
  $.ajax({
    url:'https://hypermedia123456.herokuapp.com/queryuser/deletebook',
    type:'POST',
    data:{
      'iduser':t,
      'idbook':z,
    },
    dataType:'json',
  })
  window.location.replace('https://hypermedia123456.herokuapp.com/pages/user.html');
})

$(document).on('click', "[id^=add]", function(){
  var c=document.cookie.substring(7);
  var g=this.id.substring(3);
  $.ajax({
    url:'https://hypermedia123456.herokuapp.com/queryuser/plus',
    type:'POST',
    data:{
      'iduser':c,
      'idbook':g,
    },
    dataType:'json',
  })
  window.location.replace('https://hypermedia123456.herokuapp.com/pages/user.html');
})

$(document).on('click', "[id^=minus]", function(){
  var c=document.cookie.substring(7);
  var g=this.id.substring(5);
  $.ajax({
    url:'https://hypermedia123456.herokuapp.com/queryuser/minus',
    type:'POST',
    data:{
      'iduser':c,
      'idbook':g,
    },
    dataType:'json',
  })
  window.location.replace('https://hypermedia123456.herokuapp.com/pages/user.html');
})
*/
