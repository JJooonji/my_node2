const express = require("express");
const mysql = require("mysql")
const app = express();
const port = 8080;
const router = express.Router();

//mysql 연결
const { sequelize } = require("./models");

sequelize.sync({ force: false})
  .then(() => {
    console.log("데이터베이스 연결 성공!")
})
  .catch((err) => {
    console.error(err)
  })



// connect();
// const PostRouter = require("./routes/posts");
// const commentsRouter = require("./routes/comments");
// const UserRouter = require("./routes/users");
// const router = require("./routes/posts");
// const likesRouter = require("./routes/likes")

//미들웨어?????
// const requestMiddleware = (req, res, next) => {
//     console.log("Request URL", req.originalUrl, " - ", new Date());
//     next();//
// };

//json 미들웨어를 사용해 body로 전달된 데어터를 사용할 수 있게 함.

// app.use(requestMiddleware);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//미들웨어 사용

app.use("/", express.urlencoded({ extended: false }), router);
// app.use(express.json());

// app.use("/api", express.json(), router);


app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!")
})