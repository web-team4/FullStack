const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

const mysql = require("mysql")
const conn = mysql.createConnection({
  connectionLimit: 10,
  host: "rds-mysql.czcx3u99qijn.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  port: "3306",
  password: "12345678",
  database: "table_connect",
})
conn.connect()

router.get("/", function(req, res) {
  res.send({ err: "ERR" })
})

router.post("/", function(req, res) {
  let user_mbti = req.body.mbti;
  var user_id = req.session.user_id;
  // 로그인 안했을때, session에 엠비티아이 저장 (auth 참고)
  req.session.user_mbti = user_mbti;
  // 로그인 했을때, db에 mbti 저장
  var sql = "UPDATE user SET user_mbti = ? WHERE user_id = ?";
  conn.query(sql,[user_mbti, user_id],function(err, rs){
    res.send({mbti:true});
  })
})

module.exports = router

