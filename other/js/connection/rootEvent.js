var express = require('express');
var router = express.Router();
var eventQuery=require('../query/event.js')

router.get('/all', eventQuery.getall);
router.get('/today', eventQuery.getToday);
router.get('/types', eventQuery.getType);
router.get('/:id', eventQuery.getbyID);
router.get('/type/:type', eventQuery.getbytype);

module.exports=router;
