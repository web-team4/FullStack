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
router.get("/:board_id", function(req, res) {
  const board_id = parseInt(req.params.board_id)
  console.log("/deleteBoard 삭제 요청", board_id)
  var sql = "DELETE FROM board WHERE board_id=?;"
  conn.query(sql, [board_id], function(err, rs) {
    if (err) {
      console.log(err)
      res.send(
        `<script>
              if(confirm("삭제하는데에 오류가 발생했습니다.")){
                window.location.href='/detail/'+${board_id}}
              </script>`
      )
    } else {
      res.redirect("/list")
    }
  })
})

module.exports = router
