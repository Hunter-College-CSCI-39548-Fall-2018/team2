const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subgoal = new Schema({
    title :{type: String, required: true},
    description: {type: String, required: true},
    created: {type: Date, required: true},
    completed: {type: Date},
    structure: {type: String}
});

module.exports = mongoose.model('Subgoal', Subgoal);