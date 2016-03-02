/**
 * Created by kfraser on 27/02/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
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

/**
 * Create a question. Add the question to the question table.
 * Add the reference to the lecture and user tables.
 */
router.post('/addquestion',jsonParser, function(req, res, next) {


    console.log(req.body);

    var newQuestion = Question({
        classid: req.body.classid,
        question: req.body.question,
        summary: req.body.summary,
        choices: req.body.choices,
        answers: [],
        userid: req.body.user,
        date: req.body.date,
        type: req.body.type,
        anonymous: req.body.anonymous
    });
    var promise = newQuestion.save();

    promise.then(function(question) {

            Lecture.findOne({name: question.classid}, function(err, lecture){
                if(err) console.log("Error retrieving class.");
                lecture.questions.push(question._id);
                lecture.save(function(err){
                    if(err) throw err;
                    console.log('class updated.');
                });
            });

            User.findOne({userid: question.userid }, function(err, user) {
                if (err) console.log("error searching user"+err);
                user.questions.push(question._id);
                user.save(function(err){
                    if(err) throw err;
                    console.log('user updated.');
                });
            });
            res.send(question);
        })
        .catch(function(err){
            // just need one of these
            console.log('the error:', err);
        });
});

/**
 * Get a list of questions for a given class
 */
router.get('/getquestions', function(req, res, next) {
    Question.find({ classid: req.query.classname }, function(err, questions) {
        if (err) console.log("error getting questions "+err);
        res.send(questions);
    });
});

/**
 *  Create Class
 *  TODO: Add the object id of the new class item to the
 *  TODO: user who created the class (now participant).
 *  */
router.post('/addclass',jsonParser, function(req, res, next) {

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
        res.send(lectures);
    });
});

/**
 * Get a class given class name. (NOTE: the class name should unique!)
 */
router.get('/getclass', function(req, res, next) {

    Lecture.findOne({name: req.query.classname}, function(err, lecture){
        if(err) console.log("Error retrieving class list.");
        res.send(lecture);
    });

});

module.exports = router;



