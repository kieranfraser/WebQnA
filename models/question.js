/**
 * Created by kfraser on 09/02/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = Schema({
    question: String,
    answers: [{
        answer: String,
        user: String,
        date: Date,
        anonymous: Boolean
    }],
    user: String,
    date: Date,
    type: String,
    anonymous: Boolean
});

var Question = mongoose.model('questions', questionSchema);

module.exports = Question;