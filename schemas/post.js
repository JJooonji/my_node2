const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        uniapu: true,
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
    password: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    likes: {
        type: Number
    }
});

// postSchema.virtual("postId").get(function () {
//     return this._id.toHexString();
// });

// postSchema.set("toJSON", {
//     virtuals: true,
// });


module.exports = mongoose.model("Posts", postSchema);