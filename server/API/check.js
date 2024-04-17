let db = require('../db/index')

// 签到
exports.check = (req, res) => {
  const sql = 'insert into sign_in (user_id, sign_in_time) values (?, ?)'
  db.query(sql, [req.body.params.user_id, new Date()], (err) => {
    if (err) return res.send('错误：' + err.message)
    res.send({
      status: 200,
      message: '签到成功',
    })
  })
}

// 签退
exports.check_out = (req, res) => {
  const sql = 'update sign_in set sign_out_time = ? where user_id = ? and sign_out_time is null'
  db.query(sql, [new Date(), req.body.params.user_id], (err) => {
    if (err) return res.send('错误：' + err.message)
    res.send({
      status: 200,
      message: '签退成功',
    })
  })
}

// 获取id
exports.check_id = (req, res) => {
  const sql = 'select user_id from user_info where username = ?'
  db.query(sql, [req.auth.username], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}

// 查询签到表当天该用户的签到记录
exports.check_record = (req, res) => {
  const sql = 'select * from sign_in where user_id = ? and sign_in_time >= DATE(NOW()) and sign_in_time < DATE_ADD(DATE(NOW()), INTERVAL 1 DAY)'
  db.query(sql, [req.query.user_id], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}

// 查询每个用户签到记录
exports.check_list = (req, res) => {
  const sql = 'select user_id, sign_in_time, sign_out_time from sign_in where user_id = ? '
  db.query(sql, [req.query.user_id], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}
