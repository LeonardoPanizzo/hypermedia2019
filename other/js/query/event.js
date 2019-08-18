var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('title','description','place','dateAndTime','type').from('artisticEvent').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

module.exports={getall}
