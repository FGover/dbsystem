// 用于配置数据库相关信息

let mysql = require('mysql')

let db = mysql.createPool({
  host: '127.0.0.1',  // 数据库IP地址
  user: 'ccy',  // 数据库登录账户
  password: '123456',  // 数据库登录密码
  database: 'work'   // 要操作的数据库
})

module.exports = db