/**
 * Created by kfraser on 09/02/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    facebook_id: String,
    classes: [String],
    questions: [String],
    anonymous: Boolean,
    auth: String,
    gmail: String
});


var User = mongoose.model('users', userSchema);

module.exports = User;