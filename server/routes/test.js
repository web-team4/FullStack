//모듈
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
  console.log("/test 액션 요청")
  const user_mbti = req.body.user_mbti // form에서 안보이게 ueser_mbti 전달
  if (req.session.user_id) {
    // 로그인 후 테스츠하면 데이터베이스에 결과 저장됨
    var user_id = req.session.user_id
    console.log("로그인 된 상태에서 테스트", user_mbti, user_id)
    sql = "UPDATE user SET user_mbti=? WHERE user_id=?"
    conn.query(sql, [user_mbti, user_id], function(err, result) {
      if (err) {
        res.send(`<script>
                  if(confirm("테스트 결과를 저장하지 못했습니다.")){window.location.href='/'}
                  </script>`)
      } else {
        console.log("인서트 성공")
      }
    })
  }
  if (user_mbti == "istj") {
    res.send("istj")
  } else if (user_mbti == "isfj") {
    res.send("isfj")
  } else if (user_mbti == "infj") {
    res.send("infj")
  } else if (user_mbti == "intj") {
    res.send("intj")
  } else if (user_mbti == "istp") {
    res.send("istp")
  } else if (user_mbti == "isfp") {
    res.send("isfp")
  } else if (user_mbti == "infp") {
    res.send("infp")
  } else if (user_mbti == "intp") {
    res.send("intp")
  } else if (user_mbti == "estp") {
    res.send("estp")
  } else if (user_mbti == "esfp") {
    res.send("esfp")
  } else if (user_mbti == "enfp") {
    res.send("enfp")
  } else if (user_mbti == "entp") {
    res.send("entp")
  } else if (user_mbti == "estj") {
    res.send("estj")
  } else if (user_mbti == "esfj") {
    res.send("esfj")
  } else if (user_mbti == "enfj") {
    res.send("enfj")
  } else if (user_mbti == "entj") {
    res.send("estj")
  }
})

module.exports = router
