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

router.post("/:board_id", function(req, res) {
  if (req.session.user_id) {
    //session은 app.js가 알아서 해주지 않을까..
    const board_id = req.params.board_id
    console.log(board_id)
    const user_id = req.session.user_id
    const user_name = req.session.user_name
    const comment_content = req.body.comment_content

    const sql =
      "INSERT INTO comment(user_id,user_name,board_id,comment_content,comment_date) VALUES(?,?,?,?,now())"
    conn.query(sql, [user_id, user_name, board_id, comment_content], function(err, result) {
      if (err) {
        console.log(err)
        res.send(`<script>
            if(confirm("댓글이 안써집니다 ㅠ")){window.location.href=document.referrer}
            </script>`) // document.referrer은 이전주소!
      } else {
        conn.query("update board set board_cnum = board_cnum+1 where board_id = ?", [board_id])
        res.send({ login: true })
      }
    })
  } else {
    //session이 없을때.
    res.send({ login: false })
  }
})

module.exports = router
