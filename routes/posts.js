const express = require("express");
const Posts = require("../schemas/post")
const router = express.Router();
const moment = require("moment");


//목록 조회 API
router.get("/", async (req, res) => {
    const { createdAt } = req.query
    
    const posts = await Posts.find({ createdAt }).sort('-createdAt')

    res.json({posts})
});

//목록 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
    const { postId } =  req.params;


    const [ posts ] = await Posts.find({ postId: Number(postId) });

    res.json({ posts })
});

//게시글 생성 API
router.post("/posts", async(req, res) => {
    const { postId, userId, password, title, content, likes } = req.body;

    const createdPost = await Posts.create({ 
        postId, userId, password, title, content, likes,
        createdAt : moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt : moment().format("YYYY-MM-DD HH:mm:ss")
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