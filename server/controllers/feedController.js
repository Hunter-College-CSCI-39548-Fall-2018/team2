const Account = require('../models/post');
const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.account_feed_get = function (req, res) { };