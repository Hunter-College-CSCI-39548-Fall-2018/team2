const Account = require('../models/account');
const Goal = require('../models/goal');
const async = require('async');

exports.fetch_posts_get= function(req, res) {

    if (!req.user) {
        res.redirect('/login');
    } else {
        Goal.find({'_id': req.query.id}).exec(function (err, goal){
            console.log(goal);
            let goalPosts = goal.posts;
            console.log('POSTS:', goal.posts);
            res.send({posts: goalPosts});
        });
    }
};

exports.update_post_post = function(req, res) {


};

exports.delete_post_post = function(req, res) {


};

exports.create_post_post = function(req, res) {

};
