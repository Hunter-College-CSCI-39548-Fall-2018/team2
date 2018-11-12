var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'Account', required: true},
    created: {type: Date, default: Date.now, required: true},
    completed: {type: Date, default: Date.now},
    priority: {type: Boolean, default: false},
    subgoals: [{type: Schema.ObjectId, ref: 'Subgoal'}],
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    img: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Goal', Goal);