var express = require('express');
var router = express.Router();
var db = require('../db/db')

const {
  getData,getmyclasses,joinclass,leaveclass
} = require('../controller/student');


router.get('/getdata',getData);
router.get('/getmyclasses',getmyclasses);
router.post('/joinclass',joinclass);
router.delete('/leaveclass',leaveclass);


module.exports = router;
