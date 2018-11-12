const Goal = require('../models/goal');
const Account = require('../models/account');
const Subgoal = require('../models/subgoal');
const async = require('async');
require('dotenv').config();

const multer = require("multer");
const upload = multer({dest: './uploads/'});
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{width: 500, height: 500, crop: "limit"}]
});

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Display list of all filtered goals belonging to a given user
exports.goal_list = function (req, res, next) {

    //ToDo: Add a filter to filter goals by the current button toggled
    Goal.find({'username': req.user.username}).exec(function (err, list_goals) {
        if (err) {
            return next(err);
        }

        res.render('/goals', {title: 'Goal List', goal_list: list_goals});
    })
};

// Handles creation of a goal on POST
exports.create_goal_post = [

    // Validate fields
    body('goalTitle').isLength({min: 1}).trim().withMessage('Title must not be empty.'),
    body('goalDescription').isLength({min: 1}).trim().withMessage('Description must not be empty'),

    // Sanitize fields
    sanitizeBody('goalTitle.*').trim().escape(),
    sanitizeBody('goalDescription.*').trim().escape(),

    (req, res, next) => {

        console.log(req.file);

        const image = {};

        // URL which is used to display image on the front-end
        image.url = req.file.url;

        // ID used to access and delete the image from Cloudinary
        image.id = req.file.public_id;

        //Image.create(image).then(newImage => res.json(newImage)).catch(err => console.log(err));

        // Extracts validation errors from the request
        const errors = validationResult(req);

        // Create a goal object with escaped and trimmed data
        const goal = new Goal({
            title: req.body.goalTitle,
            description: req.body.goalDescription,
            username: req.user.username,
            created: req.body.dateCreated,
            subgoals: [],
            posts: []
        });

        if (!errors.isEmpty()) {
            // ToDo: Insert response if form fields are invalid.
            console.log("Errors in creation of a new card\n", errors.mapped());
            res.redirect('/goals');

        } else {
            goal.save(function (err) {
                if (err) {
                    return next(err);
                }

                console.log('Successful creation of a new card!');
                res.redirect('/goals');
            });
        }
    }
];