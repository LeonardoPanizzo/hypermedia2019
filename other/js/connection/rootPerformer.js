var express = require('express');
var router = express.Router();
var performerQuery=require('../query/performer.js')

router.get('/all',seminarQuery.getall);
router.get('/:id',seminarQuery)

module.exports=router;
