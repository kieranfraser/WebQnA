var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var Lecture = require('./models/lecture');
var Question = require('./models/question');

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var api = require('./routes/api');

var app = express();

// Auth0 configuration for express
var jwt = require('express-jwt');
var jwtCheck = jwt({
  secret: new Buffer('W-KHkgITXLdjtdUC8eWaL2vD5fD1ib6IRkNhKLRk5XmEHDQvCLGiFX65tUZXb87O', 'base64'),
  audience: 'deuLbU0yLQDPCVHPaDrT8cA61JB8PCZ5'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname + '/public'));

app.use('/', index);
app.use('/dash', index);
app.use('/about', index);

// Database configuration:
//  mongodb://qandaDev:teampanda@ds054128.mongolab.com:54128/qanda
var mongodbUri = 'mongodb://qandaDev:teampanda@ds054128.mongolab.com:54128/qanda';
mongoose.connect(mongodbUri);

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
