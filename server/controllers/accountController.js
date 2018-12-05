const Account = require("../models/account");
const passport = require("passport");

exports.account_home_get = function(req, res) {
  res.sendStatus(200);
};

exports.account_learn_get = function(req, res) {
  res.sendStatus(200);
};

exports.account_subgoals_get = function(req, res) {
  if (req.user) {
    res.redirect("/subgoals");
  }
};

exports.account_registration_get = function(req, res) {
  if (req.user) {
    res.redirect("/");
  }
};

exports.account_registration_post = function(req, res) {
  Account.register(
    new Account({ username: req.body.username, password: req.body.password }),
    req.body.password,
    function(err, account) {
      if (err || req.body.password !== req.body.re_password) {
        console.log(err);
        // ToDo: Currently just refreshes page if invalid. Add response indicating error to user
      }

      passport.authenticate("local")(req, res, function() {
        res.redirect("/login");
      });
    }
  );
};

exports.account_login_post = function(req, res) {
  res.sendStatus(200);
};

exports.account_login_get = function(req, res) {
  if (req.user) {
    res.redirect("/goals");
  } else {
    res.sendStatus(200);
  }
};

exports.account_logout_get = function(req, res) {
  req.session.destroy();
  req.logout();
  res.redirect("/");
};

exports.account_error_get = function(req, res) {
  res.sendStatus(200);
};
