const express = require("express");
const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");
const router = express.Router();
const moment = require("moment");


//댓글 목록 상세 조회
router.get("/comments/:postId", async (req, res) => {
    const { postId } =  req.params;

    const comments = await Comments.find({ postId: Number(postId) }).sort('-commentCreatedAt');

    res.json({ comments })
})


//댓글 생성 API => 로그인 토큰!!!
router.post("/comments/:postId", async(req, res) => {
    const { postId } = req.params
    const { nickName, commentPosting} = req.body;

    const comments = await Comments.find({ postId })
    if(!commentPosting){
        return res
        .status(400)
        .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." })
    }

    const createdComments = await Comments.create({ 
        postId,
        nickName, 
        commentPosting, 
        commentCreatedAt : moment().format("YYYY-MM-DD HH:mm:ss")
    });

    res.json({comments : createdComments })
});

//댓글 수정 
router.put("/comments/:commentId", async (req, res) => { //commentId부분에 디비 문자열 다 넣기
    const { commentId } = req.params;
    const { commentPosting } = req.body;

    const comments = await Comments.find({ _id : commentId });
    
    if(!commentPosting){
        return res
        .status(400)
        .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." })
    }
        await Comments.updateOne({ _id: commentId }, { $set: { commentPosting } })
    
        res.json({ success: true })
})


//댓글 삭제
router.delete("/comments/:commentId", async (req, res) => { //commentId부분에 디비 문자열 다 넣기
    const { commentId } = req.params;
    
    const existComment = await Comments.find({ _id : commentId });

    if(existComment.length) {
        await Comments.deleteOne({ _id: commentId })
    }

    res.json({ success : true })
})


module.exports = router;