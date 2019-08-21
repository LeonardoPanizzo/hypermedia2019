var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type')
  .from('artisticEvent').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getType=(req,res)=>{
  db.select('type').from('artisticEvent').orderBy('type').then(function(data){
    res.json(data);
  })
}

const getToday=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type')
  .from('artisticEvent').where("").orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

module.exports={getall,getToday,getType}
