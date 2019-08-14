var db = require('../connection/connectionDB');

module.exports={
  logIn:function(name,pass){
    return db.select('iduser').from('users').where('mail',name).andWhere('password',pass);
  },
}

/*const logIn=(req,res)=>{
  db.select('iduser').from('users').where({
    mail:req.body.name,
    password:req.body.pwd
  }).then(function(data){
    res.send(data)
  })
}



module.exports={logIn}
*/
