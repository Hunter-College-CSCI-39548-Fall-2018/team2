const Account = require('../models/account');
const async = require('async');
const Goal = require('../models/goal');
const Subgoal = require('../models/subgoal');
const {ObjectID} = require('mongodb');
const {db} = require('mongodb');


exports.fetch_subgoal_get = function (req, res) {

    if (!req.user) {
        res.redirect('/login');
    } else {

        Subgoal.find({'goal': req.query.id}, function (err, result) {
            res.send({subgoals: result});
        });
    }
};

exports.create_subgoal_post = function (req, res) {

    const subgoal = new Subgoal({
        title: req.body.title,
        description: req.body.description,
        goal: req.body.id,
        completed: false,
        structure: 'Subgoal'
    });

    subgoal.save();
    console.log('Subgoal successfully saved!');
    res.sendStatus(200);
};

exports.check_subgoal_post = function (req, res) {

};


exports.update_subgoal_post = function (req, res) {

};


exports.delete_subgoal_post = function (req, res) {

};


