// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//     // postId: {
//     //     type: Number,
//     //     unique: true,
//     // },
//     userId: {
//         type: Number,
//         unique: true,
//     },
//     nickName: {
//         type: String,
//         unique: true,
//     },
//     password: {
//         type: String,
//         unique: true,
//     },
//     title: {
//         type: String,
//     },
//     content: {
//         type: String,
//     },
//     likes: {
//         type: Number
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("Posts", postSchema);

// postSchema.virtual("postId").get(function () {
//     return this._id.toHexString();
// });

// postSchema.set("toJSON", {
//     virtuals: true,
// });


// module.exports = mongoose.model("Posts", postSchema);


const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
        userId: Number,
        nickName: String,
        password: String,
        title: String,
        content: String,
        likes: Number
    }, { timestamps: true });//createdAt과 updatedAt 자동 생성해줌

module.exports = mongoose.model('Posts', postSchema)

postSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});

postSchema.set("toJSON", {
    virtuals: true,
});