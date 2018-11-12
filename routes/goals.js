var express = require('express');
var router = express.Router();

var account_controller = require('../controllers/accountController');
var goal_controller = require('../controllers/goalController');
var post_controller = require('../controllers/postController');
var subgoal_controller = require('../controllers/subgoalController');

// GET goals home page
router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

/// Goals routes ///

// POST request for creating a goal
router.post('/create', goal_controller.create_goal_post);

module.exports = router;