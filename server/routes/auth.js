const express = require("express")
const router = express.Router()
const session = require("express-session")
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

// 회원가입 폼 - localhost:3000/auth
router.get("/", function(req, res) {
  var out = `
    <script>function pwd_check(){
      if(p1.value==p2.value){
        result.innerHTML="비밀번호가 일치합니다."
      } else {
        result.innerHTML="비밀번호가 일치하지 않습니다."
      }
    }</script>
    <h1>회원가입</h1>
    <form action="/auth" method="post">
      <p> <input type="text" name="user_id" placeholder="ID"> </p>
      <p> <input type="password" name="user_password1" placeholder="비밀번호" id="p1" oninput="pwd_check()"> </p>
      <p> <input type="password" name="user_password2" placeholder="비밀번호 확인" id="p2" oninput="pwd_check()">
          <span id="result"><span>
      </p>
      <p> <input type="text" name="user_name" placeholder="USER NAME"> </p>
      <p> <input type="submit" value="회원가입"> </p>
    </form>` // script와 id.속성 , oninput 이용해서 구현 시도!
  res.send(out)
})
// 회원가입 액션
router.post("/", function(req, res, err) {
  let user_id = req.body.user_id // id
  let user_password = req.body.user_password // pwd
  let user_realname = req.body.user_realname // user_realname
  let user_nickname = req.body.user_nickname // user_realname
  let user_q = req.body.user_q // verify question
  let user_a = req.body.user_a // verify answer
  let sql = `INSERT INTO user(user_id, user_password, user_realname, user_nickname, user_q, user_a)
              VALUES (?,?,?,?,?,?)`

  conn.query(
    sql,
    [user_id, user_password, user_realname, user_nickname, user_q, user_a],
    (err, rs) => {
      if (err) {
        // user_id, user_name을 unique로 설정해서 중복되면 에러 발생
        console.log(err)
        res.status(500).send(err)
      } else {
        req.session.user_id = user_id
        req.session.user_password = user_password
        req.session.user_name = user_nickname
        req.session.save(function() {})
        res.send()
      }
    }
  )
})

// 로그인 폼
router.get("/login", function(req, res) {
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="user_id" placeholder="ID">
    </p>
    <p>
      <input type="password" name="user_password" placeholder="password">
    </p>
    <p>
      <input type="submit" value="로그인">
    </p>
    <a href="/"> 홈으로 </a>
  </form>
  `
  res.send(output)
})
// 로그인 액션
router.post("/login", function(req, res) {
  var i_user_id = req.body.user_id
  var i_user_password = req.body.user_password
  // 로그인을 하면 session에 저장이 되어야 함, 그래야 welcome 페이지에서 session 정보를 사용할 수 있음
  // 물론 mysql로도 가능하지만 일단 sql문을 작성해야 하고, data를 넘겨야 하므로 form을 써야 하는데
  // 그에 비하면 session이 훨씬 더 간편!
  var sql = "SELECT user_id ,user_nickname, user_mbti FROM user WHERE user_id=? AND user_password=?"
  conn.query(sql, [i_user_id, i_user_password], function(err, rs) {
    if (rs[0]) {
      //rs말고 rs[0]을 해야 정의 되었는지를 확실히 알 수 있음
      req.session.user_id = rs[0].user_id
      req.session.user_name = rs[0].user_nickname
      req.session.save(function() {
        res.send({
          _login: true,
          _user_name: rs[0].user_nickname,
          _user_mbti: rs[0].user_mbti,
          session: { cookie: { maxAge: 1000 * 60 * 60 } },
        })
      })
    } else {
      console.log(rs) // []으로 정의는 되어있지만 텅 비어있음 -> rs[0]이 정의 되지 않음
      res.send({ _login: false })
    }
  })
})
router.post("/check_id", (req, res) => {
  let id = req.body.id
  let sql = "select user_id from user where user_id=?"
  conn.query(sql, [id], (err, rs) => {
    if (rs[0]) {
      res.send({ id_check: true })
    } else res.send({ id_check: false })
  })
})

router.post("/check_user_nickname", (req, res) => {
  let nickname = req.body.nickname
  let sql = "select user_nickname from user where user_nickname=?"
  conn.query(sql, [nickname], (err, rs) => {
    if (rs[0]) {
      res.send({ nickname_check: true })
    } else res.send({ nickname_check: false })
  })
})

module.exports = router
