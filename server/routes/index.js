const express = require('express');
const passport = require('passport');

const router = express.Router();
const multer = require("multer");
const upload = multer({dest: './uploads/'});

// Require controllers
const account_controller = require('../controllers/accountController');
const goal_controller = require('../controllers/goalController');

/** Home Routes **/
router.get('/home', account_controller.account_home_get);

/** Subgoal Routes **/
router.get('/subgoals', account_controller.account_subgoals_get);

/** Goals routes **/

router.get('/goals', goal_controller.goals_home_get);

// POST request for creating a goal
router.post('/create', upload.single("img"), goal_controller.create_goal_post);

// POST request for updating the start status of a goal
router.post('/star', goal_controller.update_star_post);

// POST request for updating a goal
router.post('/update', upload.single("img"), goal_controller.update_goal_post);


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
    {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

/** Logout Routes **/

// GET request for logging out
router.get('/logout', account_controller.account_logout_get);


/** Error Routes **/

// GET request for error page
router.get('/error', account_controller.account_error_get);


module.exports = router;

