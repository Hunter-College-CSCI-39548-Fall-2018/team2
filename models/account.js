var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);