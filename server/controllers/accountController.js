const Account = require('../models/account');
const passport = require('passport');


exports.account_home_get = function (req, res) {
    console.log("Temporary placeholder for homepage");
};

/*
exports.account_goals_get = function (req, res) {
    if (req.user) {
        res.redirect('/goals');
    }
}; */

exports.account_subgoals_get = function (req, res) {
    if (req.user) {
        res.redirect('/subgoals');
    }
};

exports.account_registration_get = function (req, res) {
    if (req.user) {
        res.redirect('/');
    }
};

exports.account_registration_post = function (req, res) {
    Account.register(new Account({username: req.body.username, password: req.body.password}),
        req.body.password, function (err, account) {
            if (err || (req.body.password !== req.body.re_password)) {
                console.log(err);
                // ToDo: Currently just refreshes page if invalid. Add response indicating error to user
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
};

exports.account_login_post = function (req, res) {

};

exports.account_login_get = function (req, res) {
    if (req.user) {
        res.redirect('/goals');
    }
};

exports.account_logout_get = function (req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/login');
};