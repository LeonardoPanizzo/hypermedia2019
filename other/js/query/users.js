var db = require('../connection/connectionDB');

module.exports={
  logIn:function(mail,pass){
    return db.select('iduser').from('users').where('mail',mail).andWhere('password',pass);
  },
  check:function(name){
    return db.select('mail').from('users').where('mail',name);
  },
  register:function(body){
    db('users').insert(body).then(function(data){
    })
  }
}
