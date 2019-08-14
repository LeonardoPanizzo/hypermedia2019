var db = require('../connection/connectionDB');
/*var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());*/

module.exports={
  getID:function(name,pass){
    return db.select('id').from('utente').where('name',name).andWhere('password',pass).first();
  },
}

/*const getcookie=(req,res)=>{
  db.select('id').from('utente').where({
    name:req.body.name,
  }).then(function(data){
    res.cookie('name',data[0].id,{maxAge:99999});
    console.log(data);
    res.send(data)
  })
}

const print=(req,res)=>{
  console.log(req.cookies.name);
}

const logout=(req,res)=>{
  console.log(req.cookies.name);
  res.clearCookie('name');
}

module.exports={getcookie,print,logout}
*/
