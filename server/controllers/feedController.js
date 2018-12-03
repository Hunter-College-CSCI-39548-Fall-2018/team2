const Account = require('../models/post');
const async = require('async');

const multer = require("multer");
const upload = multer({ dest: './uploads/' });
const cloudinary = require("cloudinary");
const { ObjectID } = require('mongodb');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Handles creation of a post on POST
exports.create_feed_post = [

    // Validate fields
    body('postDescription').isLength({ min: 1 }).trim().withMessage('Description must not be empty'),

    (req, res, next) => {

        // Extracts validation errors from the request
        const errors = validationResult(req);

        // Create a post object with escaped and trimmed data
        const post = new Post({

            description: req.body.postDescription,
            username: req.user.username,
            subposts: [],
            posts: []
        });

        if (!errors.isEmpty()) {

            // ToDo: Insert response if form fields are invalid.

            console.log("Errors in creation of a new card\n", errors.mapped());
            res.redirect('/posts');

        } else {

            // ToDo: Look into a better way to do this to avoid code repetition

            if (req.file) { // Image provided during post creation
                try {
                    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
                        post.img = result.public_id.toString() + ".png";
                        post.save();
                        console.log('Image successfully uploaded to Cloudinary', result.url);
                    });
                    res.redirect('/posts');
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
];


exports.account_feed_get = function (req, res) { };