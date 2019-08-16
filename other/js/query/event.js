var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('title','description','place','time','type').from('artisticEvent').orderBy('time').then(function(data){
    res.json(data);
  })
}

module.exports={getall}
