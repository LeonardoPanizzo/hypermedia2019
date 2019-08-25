var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getType=(req,res)=>{
  db.select('type').distinct().from('artisticEvent').orderBy('type').then(function(data){
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
  .where('type',req.params.type).orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getbyID=(req,res)=>{
  db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent').where('idevent',req.params.id).then(function(data){
    res.send(data)
  })
}

const getByPerformer=(req,res)=>{
  db.select('artisticEvent.idevent','title','description','place','dateAndTime','type').from('artisticEvent').join('performs',{'performs.idevent':'artisticEvent.idevent'}).where('performs.idperformer',req.params.id).orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const sameDay=(req,res)=>{
  var t;
  db.select('dateAndTime').from('artisticEvent').where('idevent',req.params.id).then(function(data){
    t=data[0].dateAndTime;
  }).then(function(){
    var m = t.getMonth() + 1;
    var da=t.getFullYear()+'-'+m+'-'+t.getDate()+' 00:00:00';
    var dd=t.getFullYear()+'-'+m+'-'+t.getDate()+' 23:59:59';
    db.select('idevent','title','description','place','dateAndTime','type').from('artisticEvent').where('dateAndTime','>=', da).andWhere('dateAndTime','<=',dd).whereNot('idevent',req.params.id).orderBy('dateAndTime').then(function(data){
      res.json(data);
    })
  })
}

const getBySeminar=(req,res)=>{
  db.select('artisticEvent.idevent','title','description','place','dateAndTime','type').from('seminar').join('artisticEvent',{'artisticEvent.idseminar':'seminar.idseminar'}).orderBy('dateAndTime').then(function(data){
    res.json(data)
  })
}

module.exports={getall,getToday,getType,getbytype,getbyID,getByPerformer,sameDay,getBySeminar}
