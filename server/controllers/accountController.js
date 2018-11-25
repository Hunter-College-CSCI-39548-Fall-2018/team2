const Account = require('../models/account');
const passport = require('passport');


exports.account_home_get = function (req, res) {
    res.redirect('/goals');
};

exports.account_registration_get = function (req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('register');
    }
};

exports.account_registration_post = function (req, res) {
    Account.register(new Account({username: req.body.username, password: req.body.password}),
        req.body.password, function (err, account) {
            if (err || (req.body.password !== req.body.re_password)) {
                console.log(err);
                // ToDo: Currently just refreshes page if invalid. Add response indicating error to user
                return res.render('register');
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
};

exports.account_login_get = function (req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('login2', {user: req.user});
    }
};

exports.account_logout_get = function (req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/login');
};