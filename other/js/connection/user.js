//prova cookie
var express = require('express');
var router = express.Router();
const Loginquery=require('../query/querylogin.js');
//router.post('/coo', loginquery.getcookie);
//router.post('/cii', Loginquery.print)
router.post('/caa', (req,res)=>{
  console.log(req.cookies.iduser);
  res.cookie("iduser", "", { expires: new Date(0)});
  res.json({
    message: "Logged out!"
  });
})
router.post('/coo', (req,res)=>{
  Loginquery.getID(req.body.name).then(id=>{
    res.cookie('iduser',id);
    console.log(id);
    res.json({message:"logged in!"});
  })
})
module.exports=router;
