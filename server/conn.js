const mysql = require("mysql")
module.exports = {
  conn: mysql.createConnection({
    connectionLimit: 10,
    host: "rds-mysql.czcx3u99qijn.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    password: "12345678",
    database: "table_connect",
  }),
}
