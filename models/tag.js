/**
 * Created by kfraser on 18/03/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = Schema({
    name: String,
    classes: [String],
    questions: [Schema.Types.ObjectId]
});

var Tag = mongoose.model('tags', tagSchema);

module.exports = Tag;