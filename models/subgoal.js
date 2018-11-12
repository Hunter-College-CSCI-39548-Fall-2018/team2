var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Subgoal = new Schema({
    description: {type: String, required: true},
    created: {type: Date, required: true},
    completed: {type: Date}
});

module.exports = mongoose.model('Subgoal', Subgoal);