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

// 삭제폼(비밀번호 확인을 위한)
router.post("/:board_id", function(req, res) {
  const board_id = parseInt(req.params.board_id)
  console.log("/deleteBoard 삭제 요청", board_id)

  conn.query("delete from comment where board_id = ?", [board_id])
  conn.query("DELETE FROM board WHERE board_id=?;", [board_id], function(err, rs) {
    if (err) {
      console.log(err)
      res.send({ success: false })
    } else {
      res.send({ success: true })
    }
  })
})

module.exports = router
