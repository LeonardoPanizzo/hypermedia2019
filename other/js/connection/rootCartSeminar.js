var express = require('express');
var router = express.Router();
var cartQuery=require('../query/cartSeminar.js')

router.get('/', cartQuery.all);
router.delete('/', cartQuery.clean);
router.delete('/seminar',cartQuery.clearElement);

module.exports=router;
