const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {type: String, required: true},
    goal: {type: String, required: true},
    description: {type: String, required: true},
    created: {type: Date, default: Date.now,required: true},
    img: {data: Buffer, contentType: String},
    structure: {type: String}
});

module.exports = mongoose.model('Post', Post);