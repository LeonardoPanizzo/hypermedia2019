var express = require('express');
var router = express.Router();
var cartQuery=require('../query/cartEvent.js')

router.get('/', cartQuery.all);
router.delete('/',cartQuery.clean);

module.exports=router;
