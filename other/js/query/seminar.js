var db = require('../connection/connectionDB');

const getall=(req,res)=>{
  db.select('place','title','description','time').from('seminar').orderBy('time').then(function(data){
    res.json(data);
  })
}

/*const geteventID=(req,res)=>{
  db.select('book.idbook','title','book.idauthor','event.presentation','data','time','name','place').
  from('book').join('author',{'book.idauthor':'author.idauthor'}).join('event',{'event.idbook':'book.idbook'})
  .where('idevent',req.params.id).then(function(data){
    res.json(data);
  })
}

const getotherevents=(req,res)=>{
  db.select('event.idevent','title','book.idauthor','event.presentation','data','time','name').
  from('book').join('author',{'book.idauthor':'author.idauthor'}).join('event',{'event.idbook':'book.idbook'})
  .whereNot('idevent',req.params.id).then(function(data){
    res.json(data);
  })
}

const getall=(req, res)=>{
  db.select('book.idbook','title','book.idauthor','event.presentation','data','time','name','place','event.idevent').
  from('book').join('author',{'book.idauthor':'author.idauthor'}).join('event',{'event.idbook':'book.idbook'}).orderBy('data')
  .then(function(data){
    res.json(data);
  })
}

const getbyidbook=(req,res)=>{
  db.select('event.idevent','title','event.place','book.idauthor','event.presentation','data','time','name','event.idbook').
  from('book').join('author',{'book.idauthor':'author.idauthor'}).join('event',{'event.idbook':'book.idbook'})
  .where('event.idbook',req.query.idb).whereNot('event.idevent',req.query.ide).orderBy('data').then(function(data){
    res.json(data);
  })
}*/

module.exports={getall}
