var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
username: String,
password: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);


var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());














