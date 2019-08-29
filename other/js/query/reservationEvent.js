var db = require('../connection/connectionDB');

const all=(req,res)=>{
  db.select('artisticEvent.idevent','title','description','place','dateAndTime','type').from('artisticEvent').join('reservationArtisticEvent',{'artisticEvent.idevent':'reservationArtisticEvent.idevent'}).where('iduser',req.cookies.iduser).orderBy('dateAndTime').then(function(data){
    res.json(data);
  })
}

const clean=(req,res)=>{
  db('reservationArtisticEvent').where('iduser',req.cookies.iduser).del().then(function(data){
    res.json({message:"done"})
  });
}

const clearElement=(req,res)=>{
  db('reservationArtisticEvent').where('iduser',req.cookies.iduser).andWhere('idevent',req.body.id).del().then(function(data){
    res.json({message:"done"})
  })
}

const add=(req,res)=>{
  db('reservationArtisticEvent').insert({'iduser': req.cookies.iduser, 'idevent':req.body.id}).then(function(data){
    res.json({message:"done"})
  })
}

const check=(req,res)=>{
  db.select('iduser','idevent').from('reservationArtisticEvent').where('iduser',req.cookies.iduser).andWhere('idevent', req.params.id).then(function(data){
    if(data.length>0){
      res.json({message: true});
    }else{
      res.json({message: false});
    }
  })
}

module.exports={all,clean,clearElement,add,check}
