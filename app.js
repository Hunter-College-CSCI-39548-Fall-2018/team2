var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db.js'); //this line is recently added b/c of db.js
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url); //as well as this line
var passport = require('passport');
var expressSession = require('express-session'); //added express-session
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var routes = require('./routes/index');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(expressSession({secret: 'mySecretKey'})); // added. for express-session
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);

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

//Encrypting password before saving to db using bcrypt-node.js
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

var mongoDB = 'mongodb://127.0.0.1:27017/';
mongoose.connect(mongoDB, { useNewUrlParser: true });


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler. will print stacktrace
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


//Registration Page
passport.use('registration', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function(){
            // find a user in Mongo with provided username
            User.findOne({'username':username},function(err, user) {
                // In case of any error return
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    // set the user's local credentials
                    newUser.firstName = req.param('firstName');
                    newUser.lastName = req.param('lastName');
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };

        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

