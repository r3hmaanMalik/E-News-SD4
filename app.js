var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cron = require("node-cron");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cars = require('./routes/carRoutes');
var news = require('./routes/newsRoutes');
var sports = require('./routes/sportsRoutes');
var sports_detail = require('./routes/sports_detailRoutes');
var entertainment = require('./routes/entertainmentRoutes');
var latest = require('./routes/latestRoutes');
var ent_detail = require('./routes/ent_detailRoutes')
var lat_detail = require('./routes/lat_detailRoutes')
var student = require('./routes/studentRoutes');
var business = require('./routes/businessRoutes');
var world = require('./routes/worldRoutes');
const bodyParser = require('body-parser')
var app = express();

// mongoose // // Db
const middlewares = [
  bodyParser.urlencoded()
]

var mongoDB = 'mongodb://localhost:27017/mangoes';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

cron.schedule("* * * * *", function() {
  console.log("running a task every minute");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(middlewares)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', cars);
app.use('/news', news);
app.use('/sports', sports)
app.use('/sports_detail', sports_detail)
app.use('/latest', latest)
app.use('/entertainment', entertainment)

app.use('/entdetail', ent_detail)
app.use('/latdetail', lat_detail)

app.use('/studentcorner', student)
app.use('/Business', business)
app.use('/World', world)

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