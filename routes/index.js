const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

// GET home/goals page
router.get('/', function(req, res) {
    res.redirect('/goals');
});

// GET request for registration page
router.get('/register', function (req, res) {
    if(req.user){
        res.redirect('/');
    } else {
        res.render('register');
    }
});

// POST request for creating an account
router.post('/register', function (req, res) {
    Account.register(new Account({username: req.body.username}),
        req.body.password, function (err, account) {

        if (err || (req.body.password !== req.body.re_password)) {
            // ToDo: Currently just refreshes page if invalid. Add response indicating error to user
            return res.render('register');
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/goals', {user: req.user});
        });
    });
});

// GET request for login page
router.get('/login', function (req, res) {
    if (req.user){
        res.redirect('/');
    } else {
        res.render('login', {user: req.user});
    }

});

// POST request for logging in
router.post('/login', passport.authenticate('local',
    {successRedirect: '/', failureRedirect: '/login', failureFlash: true}
));


// GET request for logging out
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;