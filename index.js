var express = require('express');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');

var db = require('./other/js/connection/connectionDB.js');
var userR= require('./other/js/connection/rootUser.js');
var seminarR=require('./other/js/connection/rootSeminar.js');
var eventR=require('./other/js/connection/rootEvent.js');
var performerR=require('./other/js/connection/rootPerformer.js');
var reservationSeminarR=require('./other/js/connection/rootReservationSeminar.js');
var reservationEventR=require('./other/js/connection/rootReservationEvent.js');

var app = express();
app.use(cookieParser());
aap.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(__dirname+"/public"));
userR.use(bodyParser.json());
app.use('/user', userR);
app.use('/seminar', seminarR);
app.use('/artisticEvent',eventR)
app.use('/performer',performerR);
app.use('/reservationSeminar',reservationSeminarR);
app.use('/reservationArtisticEvent',reservationEventR);

var PORT=process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
