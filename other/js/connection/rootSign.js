var express = require('express');
var router = express.Router();
const Loginquery=require('../query/users.js');

router.post('/login', (req,res)=>{
  Loginquery.logIn(req.body.name, req.body.pass).then(iduser=>{
    if(iduser.length>0){
      res.cookie('iduser',iduser);
      res.json({message:"logged in!"});
    }
  })
})

router.post('/logout', (req,res)=>{
  res.cookie("iduser", "", { expires: new Date(0)});
  res.json({
    message: "Logged out!"
  });
})

//router.post('/check',Loginquery.check);

module.exports=router;
