const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer({dest: './uploads/'});

const account_controller = require('../controllers/accountController');
const goal_controller = require('../controllers/goalController');
const post_controller = require('../controllers/postController');
const subgoal_controller = require('../controllers/subgoalController');

// GET goals home page
router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

/// Goals routes ///

// POST request for creating a goal
router.post('/create', upload.single("uploadPicture"), goal_controller.create_goal_post);


module.exports = router;