var express = require('express');
var router = express.Router();
var cartQuery=require('../query/reservationSeminar.js')

router.get('/', cartQuery.all);
router.delete('/', cartQuery.clean);
router.delete('/seminar',cartQuery.clearElement);
router.post('/',cartQuery.add);

module.exports=router;
