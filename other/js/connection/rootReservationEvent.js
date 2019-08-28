var express = require('express');
var router = express.Router();
var cartQuery=require('../query/reservationEvent.js')

router.get('/', cartQuery.all);
router.delete('/',cartQuery.clean);
router.delete('/artisticEvent',cartQuery.clearElement);
router.post('/',cartQuery.add);
router.get('/:id',cartQuery.check);

module.exports=router;
