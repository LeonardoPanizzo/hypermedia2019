//prova cookie
var express = require('express');
var router = express.Router();
const Loginquery=require('../query/users.js');

router.post('/caa', (req,res)=>{
  console.log(req.cookies.iduser);
  res.cookie("iduser", "", { expires: new Date(0)});
  res.json({
    message: "Logged out!"
  });
})
router.post('/login', (req,res)=>{
  Loginquery.logIn(req.body.name, req.body.pass).then(id=>{
    res.cookie('iduser',id);
    console.log(id);
    res.json({message:"logged in!"});
  })
})
module.exports=router;
