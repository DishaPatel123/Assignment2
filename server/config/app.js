/* 
    File name: app.js (For server side config file)
    Student Name: Disha Patel
        StudentID: 301149367
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require("express-session")
let passport = require("passport")
let passportLocal = require("passport-local")
let local = passportLocal.Strategy
let flash = require("connect-flash")


//database setup
let mongose = require("mongoose");
let DB = require("./db").URI;

// Database connection
mongose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongose.connection
db.on("error", ()=>{
  console.log("> error occurred from the database");
})
db.once("open", () => {
  console.log("> successfully opened the database");
})

var app = express();

// setting up express session
app.use(session({
  secret: "someSecret",
  saveUninitialized: false,
  resave: false
}))
// Adding flash message
app.use(flash())

// Initializing the passport and session.
app.use(passport.initialize())
app.use(passport.session())


// create a User Model Instance
let userModel = require("../models/user");
let user = userModel.User;

// setting passport strategy for the user model.
passport.use(user.createStrategy())

// Serialize and Deserialize the user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// added router index.js file
var indexRouter = require('../routes/index');
var userRouter = require('../routes/user');
var contactRouter = require('../routes/contact');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// added public folder for the static files such as images, stylesheets, and js.
app.use(express.static(path.join(__dirname, '../../public')));
// added fontawesome folder for the icon set which is installed using npm.
app.use(express.static(path.join(__dirname+"/../../node_modules", '@fortawesome')));
// added indexRouter in path
app.use('/', indexRouter);
app.use("/",userRouter);
app.use("/contact",contactRouter);

console.log(__dirname)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
