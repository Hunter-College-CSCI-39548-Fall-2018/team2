var Goal = require('../models/goal');
var Account = require('../models/account');
var Subgoal = require('../models/subgoal');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Handles creation of a goal on POST
exports.create_goal_post = [

    // Validate fields
    body('goalTitle').isLength({ min: 1 }).trim().withMessage('Title must not be empty.'),
    body('goalDescription').isLength({min: 1}).trim().withMessage('Description must not be empty'),

    // Sanitize fields
    sanitizeBody('goalTitle.*').trim().escape(),
    sanitizeBody('goalDescription.*').trim().escape(),

    (req, res, next) => {
        // Extracts validation errors from the request
        const errors = validationResult(req);

        var goal = new Goal( {
            title: req.body.goalTitle,
            description: req.body.goalDescription,
            username: req.user.username,
            created: req.body.dateCreated,
            subgoals: [],
            posts: []
        });


        if(!errors.isEmpty()) {
            console.log(errors);
            // ToDo: Insert response if form fields are invalid
            console.log(errors.mapped());
            res.redirect('/goals');

        } else {
            goal.save(function (err) {
                if (err) {return next(err); }

                Console.log('Successful creation of a new card!');
                res.redirect('/goals');
            });
        }
    }
];