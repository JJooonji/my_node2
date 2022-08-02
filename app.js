const express = require("express");
const connect  = require("./schemas");
// const { user, post } = require("./models")
const mongoose = require("mongoose");
const app = express();
const port = 8080;
// const router = express.Router();

connect();

const PostRouter = require("./routes/posts");

// const commentsRouter = require("./routes/comments");
const UserRouter = require("./routes/users");
const router = require("./routes/posts");
// const likesRouter = require("./routes/likes")

// mongoose.connect("mongodb://localhost/my_node2", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//미들웨어
const requestMiddleware = (req, res, next) => {
    console.log("Request URL", req.originalUrl, " - ", new Date());
    next();//
};

//json 미들웨어를 사용해 body로 전달된 데어터를 사용할 수 있게 함.
app.use(express.json());

app.use(requestMiddleware);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//미들웨어 사용
app.use("/", express.urlencoded({ extended: false }), [PostRouter, UserRouter]);
// app.use("/api", express.json(), router);



app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!")
})