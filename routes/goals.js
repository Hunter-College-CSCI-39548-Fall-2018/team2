var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.post('/', function (req, res) {
    // Todo: Validate and sanitize form data with express-validator
    res.render('index', {user: req.user});
});

module.exports = router;