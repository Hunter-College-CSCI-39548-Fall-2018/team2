var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.post('/', function (req, res) {
    // Todo: Validate and sanitize form data with express-validator
    res.render('index', {user: req.user});
});

router.get('/register', function (req, res) {
    if(req.user){
        res.redirect('/');
    } else {
        res.render('register');
    }
});

router.post('/register', function (req, res) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
        if (err || (req.body.password !== req.body.re_password)) {
            // ToDo: Currently just refreshes page if invalid. Add response indicating error to user
            return res.render('register', {account: account});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/', {user: req.user});
        });
    });
});

router.get('/login', function (req, res) {
    if (req.user){
        res.redirect('/');
    } else {
        res.render('login', {user: req.user});
    }

});

router.post('/login', passport.authenticate('local',
    {successRedirect: '/', failureRedirect: '/login', failureFlash: true}
));


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;