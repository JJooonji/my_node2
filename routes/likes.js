// //////전체적으로 코드 다시 작성/////

// const express = require("express");
// const Likes = require("../schemas/like")
// const router = express.Router();
// const moment = require("moment");

// //
// router.post("/like", async (req, res) => {
//     const { value } = req.body;
//     const maxOrderByUserId = await Likes.findOne().sort("-like");
  
//     const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
//     const like = new Likes({ value, order });
//     await like.save();
//     res.send({ like });
//   });

// //
// router.get("/like", async (req, res) => {
//     const likes = await Likes.find().sort("-like").exec();
  
//     res.send({ likes });
//   });

// //순서 변경 API
// router.patch("/todos/:todoId", async (req, res) => {
//   const { todoId } = req.params;
//   const { order } = req.body;

//   const currentTodo = await Todo.findById(todoId);
//   if (!currentTodo) {
//     throw new Error("존재하지 않는 todo 데이터입니다.");
//   }

//   if (order) {
//     const targetTodo = await Todo.findOne({ order }).exec();
//     if (targetTodo) {
//       targetTodo.order = currentTodo.order;
//       await targetTodo.save();
//     }
//     currentTodo.order = order;
//   }

//   await currentTodo.save();

//   res.send({});
// });



// //Router를 app.js에서 사용하기 위해 내보내주는 코드
// module.exports = router;