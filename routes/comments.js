const express = require("express");
// const Posts = require("../schemas/post");
const Comment = require("../models/comment");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
// const moment = require("moment");


//댓글 목록 조회
router.get("/comments/:postId", async (req, res) => {
    const { contentId } =  req.params;

    // const comments = await Comment.find({ postId }).sort('-commentCreatedAt');

    const comments = await Comment.findAll({
        order : [["postId", "DESC"]],//내림차순 정렬
        where: contentId? { contentId } : undefined,
    });
    res.send({ comments })
})


//댓글 생성 API => 로그인 토큰!!!
router.post("/comments/:postId", authMiddleware, async(req, res) => {
    const { userId } = res.locals.user;
    const { contentId } = req.params
    const { nickName, comment} = req.body;

    const comments = await Comment.findAll({ postId })
    if(!userId){
        return res.status(400).send({
            errorMessage: "로그인이 필요합니다."
        })
    }
    if(!comments){
        return res
        .status(400)
        .send({ success: false, errorMessage: "댓글 내용을 입력해주세요." })
    }

    const createdComments = await Comment.create({ 
        postId,
        nickName, 
        comment
    });

    res.send({ createdComments })
});

//댓글 수정 
router.put("/comments/:commentId", authMiddleware, async (req, res) => { //commentId부분에 디비 문자열 다 넣기
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;

    const existComments = await Comment.findOne({
        where :{
            userId,
            commentId
    } });
    
    if(existComments.userId !== userId){
        return res
        .status(400)
        .send({success: false, errorMessage: "로그인이 필요한 기능입니다."})
    }
    else if(!existComments){
        return res
        .status(400)
        .send({ success: false, errorMessage: "댓글 내용을 입력해주세요." })
    } else {
        await Comment.updateOne({ comment })
    }
        
        res.sned({})
});


//댓글 삭제
router.delete("/comments/:commentId", authMiddleware, async (req, res) => { //commentId부분에 디비 문자열 다 넣기
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    
    const existComment = await Comment.findOne({ 
        where : {
            userId,
            commentId }
    });

    if(existComment.userId !== userId) {
        return res
        .status(400)
        .send({ success: false, errorMessage: "로그인이 필요한 기능입니다." })
    } else{
        await existComment.destroy;
    }
    
    res.send({})
})


module.exports = router;