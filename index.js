var express = require('express');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');

var db = require('./other/js/connection/connectionDB.js');
var userRoot= require('./other/js/connection/rootUser.js')

var app = express();
app.use(cookieParser());

app.use(express.static(__dirname+"/public"));

app.use('/querybook', bookrouter);

var PORT=process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
