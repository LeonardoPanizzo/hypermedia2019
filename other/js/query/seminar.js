var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getToday=(req,res)=>{
  var d= new Date();
  var m=d.getMonth()+1;
  var da=d.getFullYear()+'-'+m+'-'+d.getDate()+' 00:00:00';
  var dd=d.getFullYear()+'-'+m+'-'+d.getDate()+' 23:59:59';
  db.select('idseminar','place','title','description','dateAndTime')
  .from('seminar').where('dateAndTime','>=', da).andWhere('dateAndTime','<=',dd).orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const getbyID=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').where('idseminar',req.params.id).then(function(data){
    res.json(data)
  })
}

const getByEvent=(req,res)=>{
  db.select('idseminar','place','title','description','dateAndTime').from('seminar').join('artisticEvent',{'artisticEvent.idseminar':'seminar.idseminar'}).orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

module.exports={getall,getToday,getbyID,getByEvent}
