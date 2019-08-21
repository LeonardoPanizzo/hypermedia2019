var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('idperformer','name','members','isgroup','affiliation','details','achievements','shortdescription').from('performer').orderBy('name').then(function(data){
    res.json(data);
  })
}

const getbyID=(req,res)=>{
  db.select('idperformer','name','members','isgroup','affiliation','details','achievements','shortdescription').from('performer').where('idperformer',req.params.id).then(function(data){
    res.json(data);
  })
}

const getbyEvent=(req,res)=>{

}

module.exports={getall,getbyID}
