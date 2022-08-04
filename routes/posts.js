const express = require("express");
const { Post } = require("./models");
const authMiddleware = require("../middlewares/auth-middleware");
// const { connect } = require("./users");
const router = express.Router();
// const moment = require("moment");


//목록 조회 API
router.get("/posts", async (req, res) => {
    const { content } = req.query;

    // const posts = await Post.findAll({}).sort('-createdAt')
    const posts = await Post.findAll({
        order: [["postId", "DESC"]],//order는 정렬 처리!
        where: content? { content } : undefined,///여기도 이게 맞나 모르겠당...
    })
    res.send({posts})
});

//목록 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
    const { postId } =  req.params;

    const posts  = await Post.findByPK( postId );

    if(!posts) {
        res.status(400).send({})
    }else{
        res.send({ posts })
    }
    
});

//게시글 생성 API///여기도 이상한것 같다..
router.post("/posts", authMiddleware, async(req, res) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    // const createdPost = await Post.create({ 
    //     userId, title, content
    // });

    // res.json({ posts: createdPost })
    if(!userId) {
        res.status(400).send({
            errorMessage: "로그인이 필요합니다."
        })
        return;
    }
    await Post.create({ userId, title, content })
    res.send({});
});

//게시글 수정 
router.put("/posts/:postId", authMiddleware, async(req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;    
    const { title, content } = req.body;
    
    // const [posts] = await Post.findAll({ postId  }); //posts에 대괄호를 넣어서 그 안의 중괄호로 접근
    const existPost = await Post.findOne({
        where:{
            userId,
            postId,
        }
    })

    if(existPost.userId !== userId) {
        return res
        .status(400)
        .send({success: false, errorMessage: "로그인이 필요한 기능입니다."})
    } else {
        // await Post.updateOne({ _id : postId }, {$set: { title, content }})  
        await Post.update({ title, content })
    }
    
    // res.json({ success: true })
    res.send({});
});


//게시글 삭제 
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params //파라미터로 담아오는 모든 값은 문자열 
    // const { password } = req.body;

    const existPost = await Post.findOne({ 
        where: {
            userId,
            postId }
        }); //posts에 대괄호를 넣어서 그 안의 중괄호로 접근
        if(existPost.userId !== userId) {
            return res
            .status(400)
            .send({ success: false, errorMessage: "로그인이 필요한 기능입니다." })
        } else {
            // await Post.deleteOne({ postId });
            await existPost.destroy;
        }
        
    // res.json({ success: true })
    res.send({});
});


//Router를 app.js에서 사용하기 위해 내보내주는 코드
module.exports = router;

// 내 블로그 글에 좋아요 기능 달기
// - 로그인 토큰을 전달했을 때에만 좋아요 할 수 있게 하기
// - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 좋아요 취소 할 수 있게 하기
// - 게시글 목록 조회시 글의 좋아요 갯수도 같이 표출하기

// 좋아요 게시글 조회 API
//     - 로그인 토큰을 전달했을 때에만 좋아요 게시글 조회할 수 있게 하기
//     - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 조회할 수 있게 하기
//     - 제일 좋아요가 많은 게시글을 맨 위에 정렬하기