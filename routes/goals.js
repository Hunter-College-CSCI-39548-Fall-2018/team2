const express = require('express');
const router = express.Router();
require('dotenv').config();

const multer = require("multer");
const upload = multer({ dest: './uploads/'});
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

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