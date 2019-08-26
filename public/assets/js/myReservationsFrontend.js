const BUTTON_REMOVE_EVENT_PREFIX = "buttonRemove";
const PREFIX_ID_REMOVE_ART_EV = BUTTON_REMOVE_EVENT_PREFIX + "ArtEv";
const PREFIX_ID_REMOVE_SEM = BUTTON_REMOVE_EVENT_PREFIX + "Sem";
/*
gli eventi di un utente   /cartArtisticEvent/     (get)
per svuotare il carrello  /cartArtisticEvent/     (delete)
per cancellare un specifico seminario   /cartArtisticEvent/artisticEvent (delete)
    nel body bisogna inserire l'id dell'evento e va chiamato "id"

per svuotare il carrello  /cartSeminar/           (delete)
per cancellare un specifico seminario   /cartArtisticEvent/seminar (delete)
    nel body bisogna inserire l'id del seminario e va chiamato "id"
*/
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
  //when one of the two arrays has been iterated, finish iterating the remaining one
  while(indexArt < artisticEvents.length){
    stringToReturn += artisticEventInReservations(artisticEvents[indexArt], true);
    indexArt++;
  }
  while(indexSem < seminars.length){
    stringToReturn += seminarInReservations(seminars[indexSem], true);
    indexSem++;
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
  var idRemoveEvent;
  var id;
  var urlEvent;
  if(isArtisticEvent){
    id = event.idevent;
    urlEvent = getUrlArtisticEvent(id);
    idRemoveEvent = PREFIX_ID_REMOVE_ART_EV;
  }
  else{//seminar
    id = event.idseminar;
    urlEvent = getUrlSeminar(id);
    idRemoveEvent = PREFIX_ID_REMOVE_SEM;
  }
  var stringToReturn =
    //"<div class='row border_elem_in_list'>" +
    "<div class='row border_elem_in_list justify-content-center'>" +
        "<div class='col-sm-5'>" +
          "<p><a href='" + urlEvent + "'>" + event.title +
          "</a></p>" +
          "<p class='simpler_p'>";
          if(isArtisticEvent){
            stringToReturn += event.type;
          }
          else{//seminar
            stringToReturn += "seminar";
          }
          stringToReturn +=
          "</p>" +
          "<p class='simpler_p'>" +
          getFullDate(event.dateAndTime) + " at " +
          getTime(event.dateAndTime) +
          "</p>" +
        "</div>" +
        "<div class='col-sm-2 add_remove_btn_reserv'>"+
          "<button id='" + idRemoveEvent + id +"' class='big_enough_square_std_btn align-middle'>" +
            "<i class='material-icons'>remove_shopping_cart</i></button>"+
        "</div>"
    "</div>";

  return stringToReturn;
}
/*TODO: quando funziona così, allora prova a farlo con
        un'unica funzione ajax con
        PREFIX_ID_REMOVE_ART_EV o PREFIX_ID_REMOVE_SEM come
        parametro
*/
function deleteReserv(query, idWithPrefix){
  var idObjToRemove = this.id.substring(idWithPrefix.length);
  $.ajax({
    url:DOMAIN_ADDRESS+ query,
    type:'DELETE',
    data:{
      'id': idObjToRemove,
    },
    dataType:'json',
  }).then(function(){
    window.location.replace(window.location.href);
  });
}

//TODO: try to do "[id^=remove]" with class instead of id
$(document).on('click', "[id^=" + PREFIX_ID_REMOVE_ART_EV + "]", function(){
  deleteReserv("/cartArtisticEvent/artisticEvent", idWithPrefix)
  /*
  var idObjToRemove = this.id.substring(PREFIX_ID_REMOVE_ART_EV.length);
  $.ajax({
    url:DOMAIN_ADDRESS+'/cartArtisticEvent/artisticEvent',
    type:'DELETE',
    data:{
      'id': idObjToRemove,
    },
    dataType:'json',
  }).then(function(){
    window.location.replace(window.location.href);
  });*/
})

$(document).on('click', "[id^=" + PREFIX_ID_REMOVE_SEM + "]", function(){
  var idObjToRemove = this.id.substring(PREFIX_ID_REMOVE_SEM.length);
  //TODO
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
