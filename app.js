/* Import node libraries */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

/* Require modules from routes directory */
var routes = require('./routes/index');

/* Create app object using express module and
   set to use EJS view engine */
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Add middleware libraries into request handling chain */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

/* Add route-handling code to request handling chain */
app.use('/', routes);

/* Passport setup */
var Account = require('./models/account');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            // If the credentials are valid, the verify callback invokes done to supply
            // Passport with the user that authenticated
            if (err) { return done(err); }

            // If the credentials are not valid, done should be invoked with false instead
            // of a user to indicate an authentication failure.
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            //If an exception occurred while verifying the credentials (for example, if the database is not available
            return done(null, user);
        });
    }
));
passport.use(new LocalStrategy(
    Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

/* Database connection */
var mongoDB = 'mongodb://127.0.0.1:27017/';
mongoose.connect(mongoDB, { useNewUrlParser: true });


/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* Development error handler. Will print stacktrace */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
module.exports = app;