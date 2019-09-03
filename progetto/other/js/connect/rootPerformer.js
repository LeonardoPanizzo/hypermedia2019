var express = require('express');
var router = express.Router();
var performerQuery=require('../query/performer.js')

router.get('/',performerQuery.getall);
router.get('/:id',performerQuery.getbyID);
router.get('/artisticEvent/:id',performerQuery.getbyEvent);

module.exports=router;
