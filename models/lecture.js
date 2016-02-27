/**
 * Created by kfraser on 09/02/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lectureSchema = Schema({
    name: String,
    participants: [String],
    questions: [Schema.Types.ObjectId]
});

var Lecture = mongoose.model('lectures', lectureSchema);

module.exports = Lecture;