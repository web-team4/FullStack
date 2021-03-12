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
//리스트
router.get("/", function(req, res) {
  res.redirect("/list/1")
  // list경로 이동 요청시 list/1로 이동 요청.
  //여기서 1은 1번째 글이 아니라 게시판 1페이지라는 뜻
})

router.get("/:currentPage", function(req, res) {
  //boardList/currentPage 요청시 처리과정 진행
  //페이징
  let rowPerPage = 5 // 페이지당 보여줄 글목록 : 10개
  let currentPage = 1
  if (req.params.currentPage) {
    currentPage = parseInt(req.params.currentPage) //param로 전달된걸 정수로 변환
  }
  let beginRow = (currentPage - 1) * rowPerPage // 3페이지이면 20
  let model = {}
  //db연결
  //행 개수 구하는 쿼리 실행
  conn.query("SELECT COUNT(*) AS cnt FROM board", function(err, result) {
    //전체 글목록 행 갯수 구하기 - 이때 result는 전체 행
    if (err) {
      console.log(err)
      res.send("게시판을 불러올 수 없습니다.")
    } else {
      let totalRow = result[0].cnt // 왜 [0]을 붙이는지?
      var lastPage = Math.ceil(totalRow / rowPerPage) // 30개의 게시물 -> lastPage= 3, 31개의 게시물 -> lastPage=3.1
    }
    //쿼리문 작성, 실행, model영역에 세팅, 포워드 방식으로 boardList화면 출력
    var sql =
      'SELECT board_id as id ,board_title as title , DATE_FORMAT(add_date,"%m/%d %H:%i") as date,user_name as writer,board_view as view,board_like,board_cnum ,board_content as des FROM board ORDER BY board_id DESC LIMIT ?,?'
    // beginRow가 20이면 20부터 10개씩 20-29까지 정렬됨
    conn.query(sql, [beginRow, rowPerPage], function(err, rs) {
      if (err) {
        console.log(err)
        res.send("게시판을 불러올 수 없습니다.")
      } else {
        model.boardList = rs // 왜 이때는 rs[0]이 아닌겨!!

        model.currentPage = currentPage
        model.lastPage = lastPage
        res.send({ model: rs, currentPage: currentPage, lastPage: lastPage })
      } // 이부분 개선할 수 있지 않을까...?
    })
  })
})

module.exports = router
