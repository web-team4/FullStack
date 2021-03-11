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

// 상세내용 보기
router.get("/:board_id", function(req, res) {
  console.log("/boardDetail 요청")
  console.log(req.params.board_id)
  if (!req.params.board_id) {
    res.redirect("/list") // board_id 가 없으면 boardList/1로 리다이렉트
  } else {
    var sql =
      'SELECT board_title,board_content,user_name,user_id,DATE_FORMAT(add_date,"%m/%d %H:%i") as add_date,board_id FROM board WHERE board_id=?'
    // DATE_FORMAT(add_date,"%m/%d %H:%i") as add_date :: 시간 데이터를 원하는 포맷으로 가져올 수 y
    conn.query(sql, [parseInt(req.params.board_id)], function(err, b_rs) {
      // 보드에 관한 r은 b_rs
      if (err) {
        console.log(err)
        res.send("게시글을 찾을 수 없습니다.")
      } else {
        var sql =
          'SELECT user_name, comment_content, DATE_FORMAT(comment_date,"%m/%d %H:%i") as comment_date FROM comment WHERE board_id=?'
        conn.query(sql, [parseInt(req.params.board_id)], function(err, c_rs) {
          if (err) {
            console.log(err)
            res.send("게시글을 찾을 수 없습니다.")
          } else {
            if (b_rs[0].user_id == req.session.user_id) {
              // board의 i와 session의 id가 같을 때 즉, 수정, 삭제의 권한 부여
              res.render("boardDetail_id", {
                board_title: b_rs[0].board_title,
                board_id: b_rs[0].board_id,
                board_content: b_rs[0].board_content,
                user_name: b_rs[0].user_name,
                add_date: b_rs[0].add_date,
                c_rs: c_rs,
              })
            } else {
              res.render("boardDetail", {
                board_title: b_rs[0].board_title,
                board_id: b_rs[0].board_id,
                board_content: b_rs[0].board_content,
                user_name: b_rs[0].user_name,
                add_date: b_rs[0].add_date,
                c_rs: c_rs,
              })
            }
          }
        })
      }
    })
  }
})

module.exports = router
