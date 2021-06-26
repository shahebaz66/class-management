var express = require('express');
var router = express.Router();
var db = require('../db/db')



const {
  getData,createClass,updateClass,deleteClass
} = require('../controller/teacher');

router.get('/getdata',getData);
router.post('/createclass',createClass);
router.put('/updateclass',updateClass);
router.delete('/deleteclass',deleteClass);

module.exports = router;
