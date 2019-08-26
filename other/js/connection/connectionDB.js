var knex = require('knex')({
  /*
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    //password : '123456789',
    password : '290396',
    database : 'aaaa',
    port:5432
  }
  */
  client: 'pg',
  connection: {
    host : 'ec2-54-247-170-5.eu-west-1.compute.amazonaws.com',
    user : 'olheaeorfhaakh',
    password : 'c1f137921f8051c460f249af820cbdef03b3daf22be26477e60f1917b3464f1a',
    database : 'd4bg770g99j223',
    port:5432
  }
});

module.exports=knex;
