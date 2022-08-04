const express = require("express");
// const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();


// const userSchema = Joi.object({
//   nickName: Joi.string()
//   .alphanum()
//   .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
//   .required(),

//   password: Joi.string()
//   .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
//   .required(),

//   confirmPassword: Joi.ref('password')
// });

//회원가입 API
router.post("/signup", async (req, res) => {
  try {
    const { nickName, password, confirmPassword } = req.body;
    

  if(password !== confirmPassword) {
    res
    .status(400)
    .send({
      errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다."
    });
    return; //이 아래의 코드는 실행될 필요가 없으나 리턴하지 않으면 아래 코드도 읽기때문에 리턴을 해줌.
  }

  const existUsers = await User.findAll({ 
    where: {
      nickName }});////이게맞나????
  if(existUsers.length) {
    res.status(400).send({
      errorMessage: "중복된 닉네임이 있습니다."
    })
    return;
  }

  await User.create({ nickName, password });//객체를 만드는 방식이아니고, 비동기함수임으로 이렇게 작성함.

  // await User.save();

  res.status(201).send({
    message:"회원가입에 성공하였습니다."
  });
  }
  catch(err){
    res.status(400).send({
      errorMessage: "error"
    })
  }
});

//로그인 API
router.post("/login", async (req, res) => {
  const { nickName, password } = req.body;

  //nickName,password 일치 확인
  const user = await User.findOne({ where : { nickName, password } });

  if(!user){
    res.status(401).send({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요."
    });
    return;
  }

  // const userId = user._id
//   const token = jwt.sign({ _id: user._id }, "aa-secret-key")
  const token = jwt.sign({ userId: user.userId }, "jje-secret-key")
  res.send({
    token, 
  });
});

router.get("/signup/me", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  // console.log(user)
  res.send({ 
    user,
    // :{
    //   userId:user._id,
    //   // nickName:user.nickName
    //   //패스워드는 보안상 남기면 안됨.
    // }
  })
});


module.exports = router;