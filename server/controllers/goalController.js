const Goal = require('../models/goal');
const async = require('async');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const multer = require("multer");
const upload = multer({dest: './uploads/'});
const cloudinary = require("cloudinary");

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Return home goals page (retrieves list of filtered goals belonging to a given user
exports.goals_home_get = function (req, res, next) {

    // ToDo: Add a filter to filter goals by the current button toggled

    Goal.find({'username': req.user.username}, function (err, list_goals) {
        if (err) return next(err);

        res.locals.goals = (req.session.goals === undefined || req.session.length === 0)
            ? list_goals : req.session.goals;

        const MAX_DESCRIPTION_LENGTH = 68;

        // Format goals before displaying to meet card structure
        for (let i = 0; i < res.locals.goals.length; i++) {
            res.locals.goals[i].title = list_goals[i].title.charAt(0).toUpperCase() + list_goals[i].title.slice(1);

            if (res.locals.goals[i].description.length > MAX_DESCRIPTION_LENGTH) res.locals.goals[i].description =
                res.locals.goals[i].description.substring(0, MAX_DESCRIPTION_LENGTH) + "....";
        }

        req.session.goals = res.locals.goals;
        res.render('index', {user: req.user});

    }).lean();
};

// Handles creation of a goal on POST
exports.create_goal_post = [

    // Validate fields
    body('goalTitle').isLength({min: 1}).trim().withMessage('Title must not be empty.'),
    body('goalDescription').isLength({min: 1}).trim().withMessage('Description must not be empty'),

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

            // ToDo: Look into a better way to do this to avoid code repetition

            if (req.file) { // Image provided during goal creation
                try {
                    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
                        goal.img = result.url.toString();
                        goal.save();
                        console.log('Image successfully uploaded to Cloudinary', result.url);
                        req.session.goals.push(goal);
                        res.redirect('/goals');
                    });
                } catch (err) {
                    console.log(err);
                }
            } else {
                // Select a random default image to be associated with the goal
                const default_images = ['cactus.jpg', 'garden.jpg', 'greenhouse.jpg', 'meadow.jpg'];
                goal.img = 'assets/' + default_images[Math.floor(Math.random() * default_images.length)];

                goal.save();
                req.session.goals.push(goal);
                res.redirect('/goals');
            }
        }
    }
];

// Handles updating of a goal on POST
exports.update_goal_post = [

    // Validate fields
    body('goalTitle').isLength({min: 1}).trim().withMessage('Title must not be empty.'),
    body('goalDescription').isLength({min: 1}).trim().withMessage('Description must not be empty'),

    (req, res, next) => {

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

            console.log("Errors in updating of a new card\n", errors.mapped());
            res.redirect('/goals');

        } else {
            Goal.findByAndUpdate(req.params.author, goal, {}, function (req, res) {
                if (err) {
                    return next(err);
                }
                res.redirect('/goals');
            });
        }
    }
];

// Handles deleting a goal on POST
exports.delete_goal_post = function (req, res, next) {

    async.parallel({
        goal: function (callback) {
            Goal.findById(req.paramas.id).exec(callback)
        }

        // ToDo: Insert code to delete all of the subgoals

    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.goal == null) res.redirect('/goals');
        res.render('index')
    });
};