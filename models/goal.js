const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    username: {type: String, required: true},
    created: {type: Date, required: true},
    completed: {type: Date},
    priority: {type: Boolean, default: false},
    subgoals: [{type: Schema.ObjectId, ref: 'Subgoal'}],
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    img: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Goal', Goal);