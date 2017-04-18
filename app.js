const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./db');
require("./passport");

const index = require('./routes/index');
const users = require('./routes/users');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');https://www.redbubble.com/people/gearlus/works/25085622-vampimari-pattern?p=leggings&size=m

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app
  .use(session({
    store: new RedisStore(),
    secret: "i love moos",
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(authRoutes)
  .use(postRoutes)
  .get("/", (req, res, next) => {
    res.send({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated()
    })
  })
;


app
  .get('/users', (req, res, next) => {
    db("users").then((users) => {
      res.send(users)
    }, next)
  })
  .get('/users/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .first()
      .then((users) => {
        res.send(users)
      }, next)
  })
  .post('/users', (req, res, next) => {
    db("users")
      .insert(req.body)
      .then((userIds) => {
        res.send(userIds)
      }, next)
  })
  .put('/users/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .update(req.body)
      .then((result) => {
        if (result === 0) {
          return res.sendStatus(400);
        }
        res.sendStatus(200)
      }, next)
  })
  .delete('/users/:id', (req, res, next) => {
    const { id } = req.params;

    db("users")
      .where("id", id)
      .delete()
      .then((result) => {
        if (result === 0) {
          res.sendStatus(400);
        }
        res.sendStatus(200)
      }, next)
  })
;


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
