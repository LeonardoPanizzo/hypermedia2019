var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456789',
    database : 'aaaa',
    port:5432
  }
});

module.exports=knex;
