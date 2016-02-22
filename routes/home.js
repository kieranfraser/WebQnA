/**
 * Created by kfraser on 03/02/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home listing. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'This is the Home Page' });
});

module.exports = router;
