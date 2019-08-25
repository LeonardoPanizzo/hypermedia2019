var db = require('../connection/connectionDB');

const all=(req,res)=>{
  db.select('artisticEvent.idevent','title','description','place','dateAndTime','type').from('artisticEvent').join('cartArtisticEvent',{'artisticEvent.idevent':'cartArtisticEvent.idevent'})
  .where('iduser',req.cookies.iduser).then(function(data){
    res.json(data);
  })
}

const clean=(req,res)=>{
  db('cartArtisticEvent').where('iduser',req.cookies.iduser).del().then(function(data){
    res.json({message:"done"})
  });
}

const clearElement=(req,res)=>{
  db('cartArtisticEvent').where('iduser',req.cookies.iduser).andWhere('idevent',req.body.id).del().then(function(data){
    res.json({message:"done"})
  })
}
}

module.exports={all,clean,clearElement}
