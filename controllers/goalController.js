const Goal = require('../models/goal');
const async = require('async');

const multer = require("multer");
const upload = multer({dest: './uploads/'});
const cloudinary = require("cloudinary");

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Return home goals page (retrieves list of filtered goals belonging to a given user
exports.goals_home_get = function (req, res, next) {

        //ToDo: Add a filter to filter goals by the current button toggled
        Goal.find({'username': req.user.username}, function (err, list_goals) {
            console.log(req.user.username);
            if (err) return next(err);
            for (let i = 0; i < list_goals.length; i++){
                   console.log(list_goals[i].title);
            }
            res.render('index', {title: 'Goal List', goal_list: list_goals, user: req.user});
        }).lean();
};

// Handles creation of a goal on POST
exports.create_goal_post = [

    // Validate fields
    body('goalTitle').isLength({min: 1}).trim().withMessage('Title must not be empty.'),
    body('goalDescription').isLength({min: 1}).trim().withMessage('Description must not be empty'),

    // Sanitize fields
    sanitizeBody('goalTitle.*').escape(),
    sanitizeBody('goalDescription.*').escape(),

    (req, res, next) => {

        // Extracts validation errors from the request
        const errors = validationResult(req);

        // Create a goal object with escaped and trimmed data
        const goal = new Goal({
            title: req.body.goalTitle,
            description: req.body.goalDescription,
            username: req.user.username,
            subgoals: [],
            posts: []
        });

        if (!errors.isEmpty()) {
            // ToDo: Insert response if form fields are invalid.

            console.log("Errors in creation of a new card\n", errors.mapped());
            res.redirect('/goals');

        } else {
            console.log('description', goal.description);
            if (req.file) { // Image provided during goal creation
                try {
                    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
                        goal.img = result.url.toString();
                        goal.save();
                        console.log('Image successfully uploaded to Cloudinary', result.url);
                    });
                } catch (err) {
                    console.log(err);
                }
            } else {
                goal.save();
            }
            console.log('Successful creation of a new card!');
            res.redirect('/');
        }
    }
];