const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    // postId: Number,
    userId:Number,
    nickName: String,
    comment: String
}, { timestamps: true });

module.exports = mongoose.model("Comments", commentSchema)

postSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});

postSchema.set("toJSON", {
    virtuals: true,
});