var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getType=(req,res)=>{
  db.select('type').from('artisticEvent').orderBy('type').then(function(data){
    res.json(data);
  })
}

const getToday=(req,res)=>{
  var d= new Date();
  var m=d.getMonth()+1;
  var da=d.getFullYear()+'-'+m+'-'+d.getDate()+' 00:00:00';
  var dd=d.getFullYear()+'-'+m+'-'+d.getDate()+' 23:59:59';
  db.select('idevent','title','description','place','dateAndTime','type').where('dateAndTime','>=', da).andWhere('dateAndTime','<=',dd).from('artisticEvent').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getbytype=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent')
  .where('type',req.params.type).then(function(data){
    res.json(data);
  })
}

const getbyID=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent').where('idevent',req.params.id).then(function(data){
    res.send(data)
  })
}

const getByPerformer=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent').join('performs',{'performs.idevent':'artisticEvent.idevent'}).where('performs.idperformer',req.params.id).then(function(data){
    res.json(data);
  })
}

module.exports={getall,getToday,getType,getbytype,getbyID,getByPerformer}
