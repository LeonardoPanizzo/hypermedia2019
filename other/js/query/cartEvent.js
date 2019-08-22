var db = require('../connection/connectionDB');

const all=(req,res)=>{
  db.select('artisticEvent.idevent','title','description','place','dateAndTime','type').from('artisticEvent').join('cartArtisticEvent',{'artisticEvent.idevent','cartArtisticEvent.idevent'}).where('iduser',req.cookies.iduser).then(function(data){
    res.send(data)
  })
}

module.exports={all}
