$(document).ready(function(){

  if(!document.cookie){
    alert('you are not logged in!');
    window.location.replace(DOMAIN_ADDRESS);
  }
  else{

    var artisticEvents;
    var seminars;
    var stringResults;

    $.get( DOMAIN_ADDRESS + "/cartArtisticEvent/", function(results){
      artisticEvents = results;
    }).then(function(){
      $.get( DOMAIN_ADDRESS + "/cartSeminar/", function(results){
        seminars = results;
      }).then(function(){
        if(artisticEvents.length === 0 && seminars.length === 0){
          stringResults =
          "<h2>You don't have reserations for any event.</h2><br>"+
            "<h4>" +
            "<a href='calendar.html'>Click here</a>" +
            " to find something interesting!</h4>";
        }
        else{
          stringResults = cartResults(artisticEvents, seminars);
        }
        $('#reservationList').append(stringResults);
    });
  });
}
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
})


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
  }
    return stringToReturn;
}

function artisticEventInReservations(artisticEvent){
  return eventInReservations(artisticEvent, true);
}

function seminarInReservations(seminar){
  return eventInReservations(seminar, false);
}

function eventInReservations(event, isArtisticEvent){
  var id;
  var urlEvent;
  if(isArtisticEvent){
    id = event.idevent;
    urlEvent = getUrlArtisticEvent(id);
  }
  else{//seminar
    id = event.idseminar;
    urlEvent = getUrlSeminar(id);
  }
  var stringToReturn =
    "<div class='row border_elem_in_list'>" +
        "<div class='col-sm-6'>" +
          "<p><a href='" + urlEvent + "'>" + event.title +
          "</a></p>" +
          "<p class='simpler_p'>(";
          if(isArtisticEvent){
            stringToReturn += event.type;
          }
          else{//seminar
            stringToReturn += "seminar";
          }
          stringToReturn +=
          ")</p>" +
          "<p>"
          getDate(event.dateAndTime) + "  " + getTime(event.dateAndTime) +
          "</p>" +
        "</div>" +
        //TODO adatta al nuovo progetto!
        "<div class='col-sm-6 center-block add_remove_btn_reserv'>"+
          //TODO!!!!!!!!!!!!: can I do the same with class instead of id for remove"+data[i].idbook?
          "<button id='remove"+ id +"' class='big_enough_square_std_btn'><i class='material-icons'>remove_shopping_cart</i></button>"+
        "</div>"
    "</div>";

  return stringToReturn;
}

//TODO: adatta a questo nuovo progetto!!!!
//try to do "[id^=remove]" with class instead of id
$(document).on('click', "[id^=remove]", function(){
  var idObj = this.id.substring("remove".length);
  if(isArtisticEvent){
    //ajax for removing an artistic event
  }
  else{
    //ajax for removing a seminar
  }
  $.ajax({
    url:'https://hypermedia123456.herokuapp.com/queryuser/deletebook',
    type:'POST',
    data:{
      'idbook':idObj,
    },
    dataType:'json',
  })
  window.location.replace(window.location.href);
})

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
