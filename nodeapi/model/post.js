const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
    },
    photo: {
        data: Buffer, // data는 binary type이 되므로
        contentType: String
    },  
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);