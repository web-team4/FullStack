/*const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/api/hello", (req, res) => {
  res.send({ message: "hello ex!" })
})
app.listen(port, () => console.log("listen"))*/
//모듈

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const cors = require("cors")
app.use(cors())

app.use(
  session({
    secret: "any", // 보안을 위한 키
    resave: false, // 권장값
    saveUninitialized: true, // 권장값
    store: new MySQLStore({
      connectionLimit: 10,
      host: "rds-mysql.czcx3u99qijn.ap-northeast-2.rds.amazonaws.com",
      user: "admin",
      port: "3306",
      password: "12345678",
      database: "table_connect",
    }),
  })
)

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
/*
conn.query("SELECT * from board", function(err, rows, fields) {
  if (err) console.log(err)
  console.log("The solution is: ", rows)
  conn.end()
})*/

//템플릿엔진 설정
app.set("view engine", "pug")
app.use(express.json())
//정적 미들웨어
app.use(express.static("public"))
//post 미들웨어
app.use(bodyParser.urlencoded({ extended: false }))

var addBoardRouter = require("./routes/addBoard")
var boardDetailRouter = require("./routes/boardDetail")
var boardListRouter = require("./routes/boardList")
var deleteBoardRouter = require("./routes/deleteBoard")
var updateBoardRouter = require("./routes/updateBoard")
var commentRouter = require("./routes/comment")
var authRouter = require("./routes/auth")
var testRouter = require("./routes/test")
var testResultRouter = require("./routes/testResult")

app.use("/add", addBoardRouter)
app.use("/detail", boardDetailRouter)
app.use("/list", boardListRouter)
app.use("/delete", deleteBoardRouter)
app.use("/update", updateBoardRouter)
app.use("/comment", commentRouter)
app.use("/auth", authRouter)
app.use("/test", testRouter)
app.use("/test_result", testResultRouter)

//home
app.post("/", function(req, res) {
  // session 유무에 따라 달라지게
  if (req.session.user_id) {
    // 로그아웃 뜨게
    res.send({ id: req.session.user_id, nickName: req.session.user_name, loginCheck: true })
  } else {
    res.send({ id: "", nickName: "", loginCheck: false })
  }
})
// 로그아웃
app.post("/logout", function(req, res) {
  delete req.session.user_id
  delete req.session.user_name

  req.session.save(function() {
    res.send()
  }) // redirect 가 있는경우, 저장하기 전에 redirect가 되는걸 방지
})
app.listen(5000, console.log("5000번 port로 서버실행"))
