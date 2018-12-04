const Goal = require('../models/goal');
const Account = require('../models/account');
const Subgoal = require('../models/subgoal');
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
                filteredGoals = results.goals.filter(goal => goal.starred);
            } else if(selectedFilter === 'Completed') {
                filteredGoals = results.goals.filter(goal => goal.completed);
            }

            const MAX_DESCRIPTION_LENGTH = 68;

            // Format goals before displaying to meet card structure
            for (let i = 0; i < filteredGoals.length; i++) {
                filteredGoals[i].title = filteredGoals[i].title.charAt(0).toUpperCase()
                    + filteredGoals[i].title.slice(1);

                if (filteredGoals[i].description.length > MAX_DESCRIPTION_LENGTH)
                    filteredGoals[i].description = filteredGoals[i].description.substring(0, MAX_DESCRIPTION_LENGTH) + "....";
            }

            console.log(selectedFilter);
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
            completed:false,
            posts: []
        });

        if (!errors.isEmpty()) {
            console.log("Errors in creation of a new card\n", errors.mapped());
            res.redirect('/goals/fetch');

        } else {

            if (req.file) { // Image provided during goal creation
                try {
                    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
                        goal.img = result.public_id.toString() + ".png";
                        goal.save();
                        console.log('Image successfully uploaded to Cloudinary', result.url);
                        console.log(goal.img);
                        res.send({'image': goal.img});
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
];

// Handles updating of a goal on POST
exports.update_star_post = function (req, res) {

    Goal.updateOne({"_id": ObjectID(req.body.id)},
        {$set: {"starred": req.body.starred} }, function (err, res) {
        if (err) console.log(err);
        console.log("Document updated - star", res);
    });

    res.sendStatus(200);
};


exports.filter_goals_post = function(req, res) {

    const category = req.body.filter;
    Account.updateOne({'username': req.user.username},
        {$set: {"goalFilter": category}}, function (err, res) {
        if(err) console.log(err);
        console.log("Document updated - filter", res);
    });
    res.sendStatus(200);
};

// Handles updating a goal on POST
exports.update_goal_post = function(req, res, next) {
    console.log("Goal marked as completed", res);
    res.sendStatus(200);
};

// Handles completing a goal on POST
exports.complete_goal_post = function(req, res, next) {

    console.log(req.body.id);
    Goal.updateOne({"_id": ObjectID(req.body.id)},
        {$set: {"completed": true} }, function (err, res) {
        if (err) console.log(err);
        console.log("Goal marked as completed", res);
    });

    Goal.findOne(ObjectID(req.body.id), function(err, res) {
        console.log('After', res.completed, req.body.id);
    });

    res.sendStatus(200);
};

// Handles deleting a goal on POST
exports.delete_goal_post = function (req, res, next) {

    async.parallel({
        goal: function (callback) {
            Goal.findById(req.params._id).exec(callback)
        },
        subgoal: function (callback) {
            Subgoal.find({'goal': req.params._id}).exec(callback)
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });
};