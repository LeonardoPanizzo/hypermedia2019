var express = require('express');
var router = express.Router();
var eventQuery=require('../query/event.js')

router.get('/all', eventQuery.getall);
router.get('/today', eventQuery.getToday);
router.get('/types', eventQuery.getType);
router.get('/:id', eventQuery.getbyID);
router.get('/type/:type', eventQuery.getbytype);
router.get('/performer/:id',eventQuery.getByPerformer);
router.get('/sameDay/:id',eventQuery.sameDay);

module.exports=router;
