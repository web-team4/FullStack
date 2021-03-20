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

router.get("/", function(req, res) {
    res.send({ err: "ERR" })
})

router.post("/", function(req, res) {
    var sql = 'SELECT user_mbti FROM user WHERE user_id = ?';
    var user_id = req.session.user_id
    conn.query(sql,[user_id],function(err, rs){
        user_mbti=rs[0].user_mbti;
        var sql = 'SELECT * FROM result WHERE mbti = ?';
        conn.query(sql,[user_mbti],function(err, rs){
            var _menu = rs[0].menu;
            var _desc = rs[0].desc;
            var _map = rs[0].map;
            res.send({menu :_menu , desc:_desc, map:_map, id:user_id});
        })
    })
})
module.exports = router
