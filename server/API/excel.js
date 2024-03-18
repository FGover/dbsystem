const db = require('../db/index')

exports.importExcel = (req, res) => {
  const sql = 'insert into user_info (username, gender, email, phone, address) VALUES (?, ?, ?, ?, ?)'
  const params = [req.body.params.username, req.body.params.gender, req.body.params.email, req.body.params.phone, req.body.params.address]

  db.query(sql, params, (err) => {
    if (err) {
      return res.send('错误：' + err.message)
    }

    // 插入 users 表
    const insertUsersSql = 'insert into users (salary, depart) VALUES (?, ?)'
    const insertUsersParams = [req.body.params.salary, req.body.params.depart]

    db.query(insertUsersSql, insertUsersParams, (err) => {
      if (err) {
        return res.send('错误：' + err.message)
      }

      res.send({
        status: 200,
        message: '导入成功',
      })
    })
  })
}
