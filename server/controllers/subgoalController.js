const Account = require('../models/account');
const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


exports.fetch_subgoal_get = function(req, res) {

    if (!req.user) {
        res.redirect('/login');
    } else {
        Goal.find({'_id': req.body.id}).exec(function (err, goal){
            if (err) { return next(err); }
            let goalSubgoals = goal.subgoals;
            console.log('POSTS:', goalSubgoals.length, goal.subgoals);
            res.send({subgoals: goalSubgoals});
        });
    }
};


exports.check_subgoal_post = function(req, res) {

};


exports.update_subgoal_post = function(req, res) {

};


exports.delete_subgoal_post = function(req, res) {

};

exports.create_subgoal_post = function(req, res) {

};

