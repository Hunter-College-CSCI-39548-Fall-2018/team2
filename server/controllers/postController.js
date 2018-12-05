const Account = require('../models/account');
const Goal = require('../models/goal');
const Post = require('../models/post');
const async = require('async');

exports.fetch_posts_get= function(req, res) {
    if (!req.user) {
        res.redirect('/login');
    } else {

        Post.find({'goal': req.query.id}, function (err, result) {
            res.send({subgoals: result});
        });
    }
};

exports.create_post_post = function(req, res) {
    const Post = new Post({
        title: req.body.title,
        description: req.body.description,
        goal: req.body.id,
        img: req.body.img,
        structure: 'Post'
    });

    subgoal.save();
    console.log('Subgoal successfully saved!');
    res.sendStatus(200);
};

exports.update_post_post = function(req, res) {

};

exports.delete_post_post = function(req, res) {


};

