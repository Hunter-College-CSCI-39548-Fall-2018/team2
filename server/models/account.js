const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    goalFilter: {type: String, default: 'All'}
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);