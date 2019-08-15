var express = require('express');
var router = express.Router();
const Loginquery=require('../query/users.js');

router.post('/login', (req,res)=>{
  Loginquery.logIn(req.body.mail, req.body.pass).then(iduser=>{
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

router.post('/check', (req,res)=>{
  Loginquery.check(req.body.mail).then(mail=>{
    res.send(mail);
  })
})

router.post('/signup',(req,res)=>{
  Loginquery.register(req.body);
  res.send(req.body);
})

module.exports=router;
