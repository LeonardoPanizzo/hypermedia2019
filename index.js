var express = require('express');

var app = express();
app.use(express.static(__dirname+"/public"));


var PORT=process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
