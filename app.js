var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var teacherRouter = require('./routes/teacher');
var studentRouter = require('./routes/student');
var authRouter = require('./routes/auth')
var protect = require('./protect')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/teacher', protect, teacherRouter);
app.use('/student', protect, studentRouter);
app.use('/auth', authRouter);


app.all('*',(req,res)=>{
  res.status(404).json({message:"url not available"})
});


var port = process.env.PORT || 3100
app.listen(port, () => {
  console.log("server running", port);

})

module.exports = app;
