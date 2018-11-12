var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goal = new Schema({
    id: Number,
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    created: {type: Date, default: Date.now},
    completed: {type: Date, default: Date.now},
    finished: {type: Boolean, default: false},
    priority: {type: Boolean, default: false},
    subgoals: [{id: Number, description: String, created: Date, completed: Boolean}],
    posts: [{id: Number, description: String, created: Date, img: { data: Buffer, contentType: String }}]
});


module.exports = mongoose.model('Goal', Goal);