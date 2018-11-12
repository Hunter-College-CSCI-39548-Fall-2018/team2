var express = require('express');
var router = express.Router();

var account_controller = require('../controllers/accountController');
var goal_controller = require('../controllers/goalController');
var post_controller = require('../controllers/postController');
var subgoal_controller = require('../controllers/subgoalController');

module.exports = router;