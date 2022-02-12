const createError = require('http-errors');
const express = require('express');
const hbs = require('express-hbs')
// helpers
require('./handlers/helpers')(hbs);

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
// Login session middlewre
const session = require('express-session');


// Routes
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// configure the view engine 
app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/layout/layout.hbs',
  //partialsDir: __dirname + '/views/partials',
}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set html files to fallback
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);

app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send(`User-agent: * \nDisallow: /`);
});

// ignore favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send errors to console on red text
  console.log("\x1b[31m", err.message)
  console.log("\x1b[31m", err.stack)

  // render the error page
  res.status(500);
  res.render('error');
});

module.exports = app;