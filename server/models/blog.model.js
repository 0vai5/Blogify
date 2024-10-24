const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
})

const BlogModel = mongoose.model('Blog', blogSchema);
module.exports = BlogModel;