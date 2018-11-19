const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subgoal = new Schema({
    description: {type: String, required: true},
    created: {type: Date, required: true},
    completed: {type: Date}
});

module.exports = mongoose.model('Subgoal', Subgoal);