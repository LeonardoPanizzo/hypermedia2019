var db = require('../connection/connectionDB');

const all=(req,res)=>{
  db.select('seminar.idseminar','place','title','description','dateAndTime').from('cartSeminar').join('seminar',{'seminar.idseminar':'cartSeminar.idseminar'}).where('iduser',req.cookies.iduser).then(function(data){
    res.send(data)
  })
}

module.exports={all}
