var express = require('express');
var router = express.Router();
var Users = require('../models/user');

/* Create Users */
router.post('/register', function(req, res, next) {

  /*var newUser = User({
   facebook_id: '1234',
   anonymous: true,
   auth: 'green',
   gmail: 'kfraser@tcd.ie'
   });

   newUser.save(function(err){
   if(err) throw err;
   console.log('User Created!');
   });*/
  log.info(req.body.username);

  res.render('home', { title: 'This is the Home Page' });
});

module.exports = router;
