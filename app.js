var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");
var exphbs  = require('express-handlebars'); // view engine


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
require('./lib/passport');
require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({   // configura el motor de plantillas
  defaultlayout: 'main', //set initial template
  layoutsDir: path.join(app.get('views'), 'layouts'), //set path templates layout
  extname: '.hbs', // set file extension
  helpers: require('./lib/handlebars') // set handlebars helpers
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(session({
  cookie: { maxAge: 86400000 },
  secret: 'challenge',
  resave: true,
  saveUninitialized: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()) // passport init
app.use(passport.session()) //passport session

//Golobal variables -
app.use((req, res, next) => {

  app.locals.user = req.user;
  app.locals.errors = (req.session.errors);
  app.locals.dataForm = (req.session.dataForm);
  next();
})

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(require('./routes/authentication'));

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
  res.render('error');
});

module.exports = app;
