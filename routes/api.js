/**
 * Created by kfraser on 27/02/2016.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Question = require('../models/question');
var User = require('../models/user');
var Lecture = require('../models/lecture');


/* Create/Get User */
router.get('/getuser', function(req, res, next) {
    console.log(req.query.userid);
    User.findOne({ userid: req.query.userid }, {new:true}, function(err, user) {
        if (err) console.log("error"+err);
        // object of the user
        if(user === null){
            console.log('null');
            var newUser = User({
                userid: req.query.userid
            });

            newUser.save(function(err){
                if(err) console.log("error: "+err);
                console.log("No user found. New user created.");
                res.send(newUser);
            });
        }
        else{
            res.send(user);
        }
    });
});

/* Create Question */
router.post('/addquestion',jsonParser, function(req, res, next) {


    console.log(req.body);

    var newQuestion = Question({
        question: req.body.question,
        summary: req.body.summary,
        choices: req.body.choices,
        user: req.body.user,
        type: req.body.type
    });

    newQuestion.save(function(err){
        if(err) throw err;
        console.log('Question saved.');
    });
    res.send(req.body);
});

/**
 *  Create Class
 *  TODO: Add the object id of the new class item to the
 *  TODO: user who created the class (now participant).
 *  */
router.post('/addclass',jsonParser, function(req, res, next) {

    console.log(req.body);

    var newLecture = Lecture({
        name: req.body.name,
        participants: req.body.participants,
        questions: []
    });

    newLecture.save(function(err){
        if(err) throw err;
        console.log('Class saved.');
    });
    res.send(req.body);
});

/* Get all classes */
router.get('/getclasses', function(req, res, next) {

    Lecture.find({}, function(err, lectures){
        if(err) console.log("Error retrieving class list.");
        console.log("Class list: "+lectures);
        res.send(lectures);
    });
});

module.exports = router;



