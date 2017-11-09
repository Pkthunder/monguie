const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const log = require('./utils/logger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( function (req, res, next) {
    res.locals.ENV = app.get('env');
    return next();
});

app.use(logger('dev'));             // TODO: separate request logs from server logs
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/libs', express.static(path.join(__dirname, '../libs')));

// include all server routes
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

const db = require('./db');

db.connect()
.then( function () {
  const server = app.listen(process.env.PORT || 4000, function () {
        const host = server.address().address;
        const port = server.address().port;
        log.verbose(`The current Node env is ${ app.get('env') }`);
        log.info(`Mon-Gu-i is now listening at ${ port }`);
    });
});
