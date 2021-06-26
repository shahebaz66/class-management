var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../db/db');
const bcrypt = require('bcrypt');

router.post('/login', async function (req, res, next) {
    var user = await db.findOne({ mobile: req.body.number });

    bcrypt.compare(req.body.password, user.password, function (err, result) {

        if (result) {
            var id = user.id
            var token = jwt.sign({ id }, 'mytokensecrectveryhardtobreack');
            res.status(200).json({ loggedIn: true, jwt: token })
        } else {
            res.status(200).json({ message: "phone number or password incorrect" })
        }
    });
});
router.post('/signup', async function (req, res, next) {
    var pass
    if (req.body.number != "" && req.body.password != "" && req.body.name != "" && req.body.type!="") {
        var a = await db.find({ mobile: req.body.number })
        if (a.length == 0) {
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                var user = await db.create({
                    name: req.body.name, 
                    mobile: req.body.number,
                    password:hash,
                });
                if (user) {
                    var id = user.id
                    var token = jwt.sign({ id }, 'mytokensecrectveryhardtobreack');
                    res.status(200).json({ loggedIn: true, jwt: token })
                }
            });

        } else {
            res.status(409).json({ message: "phone number already exist" })
        }
    } else {
        res.send('enter all fields');
    }
});

module.exports = router;