var db = require('../connection/connectionDB');

const bb=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').where('idseminar',req.params.id).then(function(data){
    res.send(data)
  })
}

module.exports={bb}
