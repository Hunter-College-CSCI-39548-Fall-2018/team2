const express = require('express');
const passport = require('passport');

const router = express.Router();
const multer = require("multer");
const upload = multer({dest: './uploads/'});

const account_controller = require('../controllers/accountController');
const goal_controller = require('../controllers/goalController');
const subgoal_controller = require('../controllers/subgoalController');
const feed_controller = require('../controllers/feedController');
const post_controller = require('../controllers/postcontroller');

/** Home Routes **/

router.get('/home', account_controller.account_home_get);

/** Goals routes **/

router.get('/goals/fetch', goal_controller.goals_home_get);

// POST request for creating a goal
router.post('/goal/create', upload.single("img"), goal_controller.create_goal_post);

// POST request for updating the start status of a goal
router.post('/goal/star', goal_controller.update_star_post);

// POST request for updating a goal
router.post('/goal/update', upload.single("img"), goal_controller.update_goal_post);

// POST request fpr deleting a goal
router.post('/goal/delete', goal_controller.delete_goal_post);

// POST request for completing a goal
router.post('/goal/complete', goal_controller.complete_goal_post);

//POST request for filtering a goal
router.post('/goal/filter', goal_controller.filter_goals_post);


/** Registration Routes **/

// GET request for registration page
router.get('/register', account_controller.account_registration_get);

// POST request for creating an account
router.post('/register', account_controller.account_registration_post);


/** Login Routes **/

// GET request for login page
router.get('/login', account_controller.account_login_get);


// POST request for logging in
router.post('/login', passport.authenticate('local',
    {successRedirect: '/goals/fetch', failureRedirect: '/login', failureFlash: true}));

/** Logout Routes **/

// GET request for logging out
router.get('/logout', account_controller.account_logout_get);


/** Error Routes **/

// GET request for error page
router.get('/error', account_controller.account_error_get);

module.exports = router;

