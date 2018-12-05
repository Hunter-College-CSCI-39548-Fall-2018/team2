const Account = require('../models/account');
const async = require('async');

exports.fetch_subgoal_get = function(req, res) {

    if (!req.user) {
        res.redirect('/login');
    } else {
        Goal.find({'_id': req.params.id}).exec(function (err, goal){
            if (err) { return next(err); }
            let goalSubgoals = goal.subgoals;
            console.log('POSTS:', goalSubgoals.length, goal.subgoals);
            res.send({subgoals: goalSubgoals});
        });
    }
};

exports.create_subgoal_post = function(req, res) {

    console.log('hi');
    const subgoal = new Subgoal({
        title: req.body.title,
        description: req.body.description,
        completed: false,
        structure: 'Subgoal'
    });

    subgoal.save();
    console.log('Subgoal successfully saved!');
    res.sendStatus(200);
};

exports.check_subgoal_post = function(req, res) {

};


exports.update_subgoal_post = function(req, res) {

};


exports.delete_subgoal_post = function(req, res) {

};


