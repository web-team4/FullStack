const express = require("express")
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
// 수정폼

// 수정액션
router.post("/", function(req, res) {
  console.log("/updateBoard 수정액션 요청")
  const board_title = req.body.board_title
  const board_content = req.body.board_content
  const board_id = req.body.board_id
  console.log(board_title, board_content, board_id)
  var sql = "UPDATE board SET board_title=?,board_content=?,add_date=now() WHERE board_id=?"
  conn.query(sql, [board_title, board_content, board_id], function(err, rs) {
    if (err) {
      console.log(err)
      res.send({ update: false })
    } else {
      res.send({ update: true })
    }
  })
})

module.exports = router
