var express = require('express');
var router = express.Router();
var seminarQuery=require('../query/seminar.js')

router.get('/all',seminarQuery.getall);

module.exports=router;