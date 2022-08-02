const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nickName: String,
    password: String
});

const router = mongoose.model("Users", userSchema);
module.exports = router;

userSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});