const express = require("express");
const Posts = require("../schemas/post")
const router = express.Router();
// const moment = require("moment");


//목록 조회 API
router.get("/posts", async (req, res) => {
    
    const posts = await Posts.find({}).sort('-createdAt')

    res.json({posts})
});

//목록 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
    const { postId } =  req.params;

    const posts  = await Posts.findById({ _id: postId });

    res.json({ posts })
});

//게시글 생성 API
router.post("/posts", async(req, res) => {
    const { userId, nickName, password, title, content, likes } = req.body;

    const createdPost = await Posts.create({ 
        userId, nickName, password, title, content, likes
    });

    res.json({ posts: createdPost })
});

//게시글 수정 
router.put("/posts/:postId", async(req, res) => {
    const { postId } = req.params;    
    const { title, content, password } = req.body;
    
    const [posts] = await Posts.find({ postId : Number( postId ) }); //posts에 대괄호를 넣어서 그 안의 중괄호로 접근

    if(posts.password !== password) {
        return res.status(400).json({success: false, errorMessage: "비밀번호 불일치!"})
    } else {
        await Posts.updateOne({ postsId: Number(postId) }, {$set: { title, content }})  
    }
    
    res.json({ success: true })
});


//게시글 삭제 
router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params //파라미터로 담아오는 모든 값은 문자열 
    const { password } = req.body;

    const [existsPost] = await Posts.find({ postId : Number(postId)}); //posts에 대괄호를 넣어서 그 안의 중괄호로 접근
        if(existsPost.password !== password) {
            return res.status(400).json({ success: false, errorMessage: "비밀번호 불일치!" })
        } else {
            await Posts.deleteOne({ postId: Number(postId) });
        }
        
    res.json({ success: true })
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