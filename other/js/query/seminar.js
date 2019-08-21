var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getToday=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime')
  .from('seminar').where("").orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getbyID=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').where('idseminar',req.params.id).then(function(data){
    res.send(data)
  })
}

module.exports={getall,getToday,getbyID}
