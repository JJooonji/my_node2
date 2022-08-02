const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const Users = require("../schemas/user");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();


const schema = Joi.object({
  nickName: Joi.string()
  .alphanum()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .required(),

  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
  .required(),

  confirmPassword: Joi.ref('password')
});

//회원가입 API
router.post("/signup", async (req, res) => {
  try {
    const { nickName, password, confirmPassword } = await schema.validateAsync(req.body) ;
    

  if(password !== confirmPassword) {
    res
    .status(400)
    .send({
      errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다."
    });
    return; //이 아래의 코드는 실행될 필요가 없으나 리턴하지 않으면 아래 코드도 읽기때문에 리턴을 해줌.
  }

  const existUsers = await Users.find({ nickName });
  if(existUsers.length) {
    res.status(400).send({
      errorMessage: "중복된 닉네임이 있습니다."
    })
    return;
  }

  const user = new Users({ nickName, password });

  await user.save();

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
  const user = await Users.findOne({ nickName, password });

  if(!user){
    res.status(401).send({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요."
    });
    return;
  }

  const token = jwt.sign({ _id: user.userId }, "")
  res.send({
    token
  });
});

router.get("/signup/me", authMiddleware, async(req, res) => {
  res.status(400).send({})
});



module.exports = router;