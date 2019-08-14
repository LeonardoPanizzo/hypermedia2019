var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '290396',
    database : 'aaaa',
    port:5432
  }
});

module.exports=knex;
