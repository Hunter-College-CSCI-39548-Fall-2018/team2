const Account = require('../models/account');
const Goal = require('../models/goal');
const Post = require('../models/post');
const multer = require("multer");
const upload = multer({dest: './uploads/'});
const cloudinary = require("cloudinary");
const {ObjectID} = require('mongodb');


exports.fetch_posts_get= function(req, res) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        Post.find({'goal': req.query.id}, function (err, result) {
            res.send({posts: result});
        });
    }
};

exports.create_post_post = function(req, res) {

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        goal: req.body.id,
        structure: 'Post'
    });

    if (req.file) { // Image provided during goal creation
        try {
            cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
                post.img = result.public_id.toString() + ".jpg";
                console.log('New post created!');
                post.save();
                res.sendStatus(200);
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.sendStatus(200);
    }
};

exports.update_post_post = function(req, res) {

};

exports.delete_post_post = function(req, res) {


};

