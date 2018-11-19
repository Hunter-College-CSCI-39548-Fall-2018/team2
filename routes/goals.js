const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer({dest: './uploads/'});

const goal_controller = require('../controllers/goalController');

/** Goals routes **/

// GET goals home page
router.get('/', goal_controller.goals_home_get);

// POST request for creating a goal
router.post('/create', upload.single("uploadPicture"), goal_controller.create_goal_post);


module.exports = router;