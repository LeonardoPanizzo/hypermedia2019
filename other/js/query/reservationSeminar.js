var db = require('../connection/connectionDB');

const all=(req,res)=>{
  db.select('seminar.idseminar','place','title','description','dateAndTime').from('reservationSeminar').join('seminar',{'seminar.idseminar':'reservationSeminar.idseminar'}).where('iduser',req.cookies.iduser).orderBy('dateAndTime').then(function(data){
    res.json(data)
  })
}

const clean=(req,res)=>{
  db('reservationSeminar').where('iduser',req.cookies.iduser).del().then(function(data){
    res.json({message:"done"})
  });
}

const clearElement=(req,res)=>{
  db('reservationSeminar').where('iduser',req.cookies.iduser).andWhere('idseminar',req.body.id).del().then(function(data){
    res.json({message:"done"})
  })
}

const add=(req,res)=>{
  db('reservationSeminar').insert({'iduser': req.cookies.iduser ,'idseminar':req.body.id}).then(function(data){
    res.json({message:"done"})
  })
}

const check=(req,res)=>{
  db.select('idseminar','iduser').where('iduser', req.cookies.iduser).andWhere('idseminar', req.params.id).then(function(data){
    if(data.length>0){
      res.json({message:"true"});
    }else{
      res.json({message:"false"});
    }
  })
}

module.exports={all,clean,clearElement,add,check}
