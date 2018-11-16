const express = require('express');
const router = express.Router();

const account_controller = require('../controllers/accountController');
const goal_controller = require('../controllers/goalController');
const post_controller = require('../controllers/postController');
const subgoal_controller = require('../controllers/subgoalController');

module.exports = router;