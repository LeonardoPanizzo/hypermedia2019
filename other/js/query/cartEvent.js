var db = require('../connection/connectionDB');

const aa=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').where('idseminar',req.params.id).then(function(data){
    res.send(data)
  })
}

module.exports={aa}
