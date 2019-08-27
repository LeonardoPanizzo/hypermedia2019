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

module.exports={all,clean,clearElement}