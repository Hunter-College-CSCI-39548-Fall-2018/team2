var Goal = require('../models/goal');
var Account = require('../models/account');
var Subgoal = require('../models/subgoal');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Handles creation of a goal on POST
exports.create_goal_post = [

    // Validate fields
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('description', 'Description must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields
    sanitizeBody('title.*').trim().escape(),
    sanitizeBody('description.*').trim().escape(),

    (req, res, next) => {

        // Extracts validation errors from the request
        const errors = validationResult(req);

        var goal = new Goal( {
            title: req.body.title,
            description: req.body.description,
            author: req.user,
            created: req.body.created,
            subgoals: [],
            posts: []
        });

        if(!errors.isEmpty()) {

            // ToDo: Insert response if form fields are invalid

        } else {
            goal.save(function (err) {
                if (err) {return next(err); }
                res.redirect(/goals/);
            });
        }
    }
];