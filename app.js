const express = require("express");
const mysql = require("mysql")
const app = express();
const port = 8080;
const router = express.Router();
// const User = require("./models/user");

//mysql 연결
const { sequelize } = require("./models");

sequelize.sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공!")
})
  .catch((err) => {
    console.error(err)
  })



// connect();
const PostRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const UserRouter = require("./routes/users");
// const likesRouter = require("./routes/likes")


//미들웨어 사용

app.use("/", express.urlencoded({ extended: false }), [PostRouter, UserRouter, commentsRouter]);

app.use(express.json());



app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!")
})