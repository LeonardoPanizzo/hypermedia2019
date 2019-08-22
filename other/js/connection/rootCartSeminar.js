var express = require('express');
var router = express.Router();
var cartQuery=require('../query/cartSeminar.js')

router.get('/', cartQuery.all);

module.exports=router;
