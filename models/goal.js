const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    username: {type: String, required: true},
    created: {type: Date, default: Date.now, required: true},
    img: {type: String},
    completed: {type: Boolean},
    starred: {type: Boolean, default: false},
});

module.exports = mongoose.model('Goal', Goal);