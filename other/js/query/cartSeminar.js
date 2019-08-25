var db = require('../connection/connectionDB');

const all=(req,res)=>{
  db.select('seminar.idseminar','place','title','description','dateAndTime').from('cartSeminar').join('seminar',{'seminar.idseminar':'cartSeminar.idseminar'}).where('iduser',req.cookies.iduser).then(function(data){
    res.json(data)
  })
}

const clean=(req,res)=>{
  db('cartSeminar').where('iduser',req.cookies.iduser).del().then(function(data){
    res.json({message:"done"})
  });
}

const clearElement=(req,res)=>{
  db('cartSeminar').where('iduser',req.cookies.iduser).andWhere('idseminar',req.body.id).del().then(function(data){
    res.json({message:"done"})
  })
}

module.exports={all,clean,clearElement}
