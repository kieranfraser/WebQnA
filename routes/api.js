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

// Used for sending lecture authorisation mail
var nodemailer = require('nodemailer');


/* Create/Get User */
router.get('/getuser', function(req, res, next) {
    console.log(req.query.userid);
    User.findOne({ userid: req.query.userid },'userid lectures questions notifications auth', {new:true}, function(err, user) {
        if (err) console.log("error"+err);
        // object of the user
        if(user === null){
            console.log('null');
            var newUser = User({
                userid: req.query.userid,
                lectures: [],
                questions: [],
                notifications: [],
                auth: 'student'
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
 * Update a user with their currently joined classes
 */
router.post('/userclasses',jsonParser, function(req, res, next) {

    console.log(req.body);

    User.findOne({ userid: req.body.userid }, function(err, user) {
        if(err) console.log("Error retrieving user (update class).");

        var newClassListArray = [];
        var newClassList = req.body.classes.length;
        if(user.lectures != null) {
            var oldClassList = user.lectures.length;

            // adding user as participant to classes
            for (var i = 0; i < newClassList; i++) {
                newClassListArray.push(req.body.classes[i]);

                if (user.lectures.indexOf(req.body.classes[i]) === -1) {
                    Lecture.findOne({name: req.body.classes[i]}, function (err, lecture) {
                        if (err) console.log("Error retrieving class for update user.");
                        if(lecture.participants.indexOf(user.userid === -1)){
                            lecture.participants.push(user.userid);
                            lecture.save(function (err) {
                                if (err) throw err;
                                console.log('lecture updated with user.');
                            });
                        }
                    });
                }
            }

            // removing user as participant from classes
            for (var j = 0; j < oldClassList; j++) {
                if (req.body.classes.indexOf(user.lectures[j]) === -1) {
                    Lecture.findOne({name: user.lectures[j]}, function (err, lecture) {
                        if (err) console.log("Error retrieving class for update user.");
                        var index = lecture.participants.indexOf(user.userid);
                        console.log("Old length: " + lecture.participants.length);
                        lecture.participants.splice(index, 1);
                        console.log("New length: " + lecture.participants.length);
                        lecture.save(function (err) {
                            if (err) throw err;
                            console.log('lecture updated with user.');
                        });
                    });
                }
            }
        }
        else{
            // adding user as participant to classes
            for (var i = 0; i < newClassList; i++) {
                newClassListArray.push(req.body.classes[i]);
                Lecture.findOne({name: req.body.classes[i]}, function (err, lecture) {
                    if (err) console.log("Error retrieving class for update user.");
                    if(lecture.participants.indexOf(user.userid === -1)){
                        lecture.participants.push(user.userid);
                        lecture.save(function (err) {
                            if (err) throw err;
                            console.log('lecture updated with user.');
                        });
                    }
                });
            }
        }
        newClassListArray = [];
        for (var i = 0; i < newClassList; i++) {
            newClassListArray.push(req.body.classes[i]);
        }
        user.lectures = newClassListArray;
        user.save(function(err, updatedUser){
            if(err) throw err;
            console.log('user updated with classes.');
            res.send(updatedUser);
        });
    });
});

/**
 * Create a question. Add the question to the question table.
 * Add the reference to the lecture and user tables.
 * TODO: add question referece to the tag table.
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
        anonymous: req.body.anonymous,
        username: req.body.username,
        picture: req.body.picture,
        tags: req.body.tags
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
        questions: [],
        tags: req.body.tags
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

/**
 * Send an email to qandasteam to update a lecturer auth status
 * TODO: Password shouldn't be saved here
 */
router.post('/authorise',jsonParser, function(req, res, next) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'qandasteam@gmail.com', // Your email id
            pass: 'teampanda' // Your password
        }
    });

    var text = 'Greetings, \n\n' +
        'Please follow up with the following user to authorise them as a lecturer: \n\n'
        +'Name: '+ req.body.name+' \n\n'+'Email: '+req.body.email+' \n\n'+'Facebook: '+req.body.link+'\n\n'+
        'User Id: '+req.body.user_id+
        '\n\n\n Kind Regards, \n\n Team Qanda';
    var mailOptions = {
        from: 'qandasteam@gmail.com', // sender address
        to: 'kfraser@tcd.ie', // list of receivers
        subject: 'Authorise Lecturer: '+req.body.name, // Subject line
        text: text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
});

module.exports = router;



