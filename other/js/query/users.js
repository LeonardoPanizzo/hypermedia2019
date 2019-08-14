var db = require('../connection/connectionDB');

module.exports={
  logIn:function(name,pass){
    return db.select('iduser').from('users').where('mail',name).andWhere('password',pass);
  },
}
