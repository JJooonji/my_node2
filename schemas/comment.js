const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    nickName: {
        type: String,
        required: true,
        unique: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model("Comments", commentSchema)