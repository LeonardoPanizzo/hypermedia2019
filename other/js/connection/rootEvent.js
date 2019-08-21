var express = require('express');
var router = express.Router();
var eventQuery=require('../query/event.js')

router.get('/all', eventQuery.getall);
router.get('/today', eventQuery.getToday);
router.get('/type', eventQuery.getType);

module.exports=router;
