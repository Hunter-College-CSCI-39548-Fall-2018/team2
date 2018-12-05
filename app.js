// Import node libraries
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const multer = require("multer");
const upload = multer({ dest: './uploads/'});
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

require('dotenv').config();


// Require modules from routes directory
const routes = require('./routes/index');


/* Create app object using express module and
   set to use EJS view engine */
const app = express();
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'ejs');


// Add middleware libraries into request handling chain
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
app.use(express.static(path.join(__dirname, '../client/public')));


// Add route-handling code to request handling chain
app.use('/', routes);

// Passport setup
const Account = require('./models/account');
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

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/bloom';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Get notification of connection errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Development error handler. Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err, err.message);
    });
}


module.exports = app;