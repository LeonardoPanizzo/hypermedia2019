var express = require('express');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');

var db = require('./other/js/connection/connectionDB.js');
var userLog= require('./other/js/connection/rootLog.js');
var userSign= require('./other/js/connection/rootSign.js');

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(__dirname+"/public"));

app.use('/user', userLog);
//app.use('/user', userLog);

var PORT=process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
