//모듈
const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

//mysql 연결

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

//입력폼 - localhost:3000/add
router.get("/", function(req, res) {
  console.log("/addBoard 입력폼 요청")
  if (req.session.user_id) {
    // 로그인 했을때
    res.render("addBoard")
  } else {
    res.send(`<script>
        if(confirm("로그인 후 이용해주세요.")){
          window.location.href="/list"}
        </script>`)
  }
})

//입력액션
router.post("/", function(req, res) {
  console.log("/addBoard 입력액션 요청")
  //화면에 입력된 데이터 받기 - bosyPaser 이용
  const board_title = req.body.board_title
  const board_content = req.body.board_content
  //애초에 글 작성 폼은 로그인 한 사람에게만 뜨니까 당연히 session에 저장되어 있어야...!
  const user_id = req.session.user_id
  const user_name = req.session.user_name
  console.log(board_title, board_content, user_id, user_name)
  //add_date나 update_date는 자동으로 찍히는 current time stemp 이용
  if (!board_content || !board_title) {
    // 내용이 없으면 insert 안되게 설계
    res.send(`<script>
          if(confirm("내용을 입력해 주세요.")){
            window.location.href="/list"}
          </script>`)
  } else {
    //db연결
    var sql =
      "INSERT INTO board(board_title,board_content,user_id,user_name,add_date,board_like, board_view, board_cnum) VALUES(?,?,?,?,now(),0,0,0)"
    conn.query(sql, [board_title, board_content, user_id, user_name], function(err, result) {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        console.log("success")
        res.send({ check: true })
      }
    })
  }
})

module.exports = router
