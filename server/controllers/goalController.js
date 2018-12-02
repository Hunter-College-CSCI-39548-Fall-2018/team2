const Goal = require('../models/goal');
const Account = require('../models/account');
const async = require('async');

const multer = require("multer");
const upload = multer({dest: './uploads/'});
const cloudinary = require("cloudinary");
const {ObjectID } = require('mongodb');

const {body, validationResult} = require('express-validator/check');

// Return home goals page (retrieves list of filtered goals belonging to a given user
exports.goals_home_get = function (req, res, next) {

    if (!req.user) {
        res.redirect('/login');
    } else {
        async.parallel({
            goals: function (callback) {
                Goal.find({'username': req.user.username}).exec(callback);
            },
            account : function (callback) {
                Account.findOne({'username': req.user.username}).exec(callback);
            },
        }, function (err, results) {
            if (err) { return next(err);}

            let selectedFilter = results.account.goalFilter;
            let filteredGoals = (selectedFilter === 'All') ? results.goals : [];

            // Filter the resulting goals for the goals that meet the specified criteria
            if(selectedFilter === 'Priority') {
                filteredGoals = results.goals.filter(goal => goal.starred === true);
            } else if(selectedFilter === 'Completed') {
                filteredGoals = results.goals.filter(goal => goal.completed === true);
            }

            const MAX_DESCRIPTION_LENGTH = 68;

            // Format goals before displaying to meet card structure
            for (let i = 0; i < filteredGoals.length; i++) {
                filteredGoals[i].title = filteredGoals[i].title.charAt(0).toUpperCase() + filteredGoals[i].title.slice(1);

                if (filteredGoals[i].description.length > MAX_DESCRIPTION_LENGTH) filteredGoals[i].description =
                    filteredGoals[i].description.substring(0, MAX_DESCRIPTION_LENGTH) + "....";
            }

            console.log(filteredGoals);
            console.log(results.account.goalFilter);

            res.send({user: req.user, goals: filteredGoals, filter: selectedFilter});

        });
    }
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
            starred: false,
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
                        goal.img = result.public_id.toString() + ".png";
                        goal.save();
                        console.log('Image successfully uploaded to Cloudinary', result.url);
                    });
                    res.redirect('/goals');
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
];

// Handles updating of a goal on POST
exports.update_star_post = function (req) {

    Goal.updateOne({"_id": ObjectID(req.body.id)}, {$set: {"starred": req.body.starred} }, function (err, res) {
        if (err) console.log(err);
        console.log("Document updated - star", res);
    });
};


exports.filter_goals_post = function(req) {

    const category = req.body.filter;
    Account.updateOne({'username': req.user.username}, {$set: {"goalFilter": category}}, function (err, res) {
        if(err) console.log(err);
        console.log("Document updated - filter", res);
    });
};

exports.update_goal_post = function(req, res, next) {

};

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