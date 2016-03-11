/**
 * Created by kfraser on 09/02/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = Schema({
    classid: String,
    question: String,
    summary: String,
    choices: [String],
    answers: [{
        answer: String,
        user: String,
        date: String,
        anonymous: String,
        username: String,
        picture: String
    }],
    userid: String,
    date: String,
    type: String,
    anonymous: String,
    username: String,
    picture: String
});

var Question = mongoose.model('questions', questionSchema);

module.exports = Question;