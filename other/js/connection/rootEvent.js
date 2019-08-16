var express = require('express');
var router = express.Router();
var eventQuery=require('../query/event.js')

router.get('/all', eventQuery.getall);

module.exports=router;
