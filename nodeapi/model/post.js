const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 150
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 3000
    }
});

module.exports = mongoose.model("Post", postSchema);