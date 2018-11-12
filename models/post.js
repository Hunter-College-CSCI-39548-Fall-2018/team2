var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    created: {type: Date, required: true},
    img: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Post', Post);