const express = require('express');
const passport = require('passport');
const router = express.Router();
const account_controller = require('../controllers/accountController');

/** Home and Goal Page Routes **/

router.get('/', account_controller.account_home_get);

//router.get('/goals', account_controller.account_goals_get);

router.get('/subgoals', account_controller.account_subgoals_get);

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

module.exports = router;