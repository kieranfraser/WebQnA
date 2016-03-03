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
 * Update a question with new answers
 */
router.post('/updatequestion',jsonParser, function(req, res, next) {

    console.log(req.body);
    Question.findOne({userid: req.body.user, date: req.body.date}, function(err, question){
        if(err) console.log("Error retrieving question (answer update).");
        console.log(req.body.user);
        console.log(req.body.date);
        if(question == null){
            console.log('question not found');
        }
        console.log('this is the database: '+question.answers);
        console.log('this is the value update: '+req.body.answers);
        question.answers = req.body.answers;
        question.save(function(err){
            if(err) throw err;
            console.log('question updated with answer.');
            res.send(question);
        });
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
 * Get selected question (used for updating answer feed.
 * ToDo: could just return the answers column instead of returning the whole question.
 * ToDO: MUST CHANGE QUESTION QUERIES... NOT GOOD PRACTICE OR SCALABLE TO QUERY ON
 * ToDo: THE USER ID AND DATE (DATE IN PARTICULAR NEEDS MODIFYING)
 */

router.post('/getselectedquestion',jsonParser, function(req, res, next) {

    Question.find({ userid: req.body.user, date: req.body.date }, function(err, question) {
        if (err) console.log("error getting selected question for answer feed "+err);
        console.log(question);
        res.send(question);
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



