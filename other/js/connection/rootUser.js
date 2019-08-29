var express = require('express');
var router = express.Router();
const Loginquery=require('../query/users.js');

router.post('/login', (req,res)=>{
  Loginquery.logIn(req.body.mail, req.body.pass).then(data=>{
    if(data.length>0){
      res.cookie('iduser',data[0].iduser);
      res.json({loggedin: true});
    }
    else{
      res.json({loggedin: false});
    }
  })
})

router.delete('/logout', (req,res)=>{
  res.cookie("iduser", "", { expires: new Date(0)});
  res.json({
    message: "Logged out!"
  });
})

router.post('/check', (req,res)=>{
  Loginquery.check(req.body.mail).then(mail=>{
    res.json(mail);
  })
})

router.post('/signup',(req,res)=>{
  Loginquery.check(req,body.mail).then(data=>{
    if(data.length>0){
      res.json({message:false})
    }else{
      res.json({message:false})
      Loginquery.register(req.body);
      res.json({message:true})
    }
  })
  //Loginquery.register(req.body);
  //res.json(req.body);
})

module.exports=router;
