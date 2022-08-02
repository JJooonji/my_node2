// const { default: mongoose } = require("mongoose")
const mongoose = require("mongoose")

const connect = () => {
    mongoose
        .connect("mongodb+srv://test:sparta@cluster0.ysqxz.mongodb.net/Cluster0?retryWrites=true&w=majority", { 
            ignoreUndefined: true,
        })
        .catch(err => console.log(err))
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err)
});

module.exports = connect;