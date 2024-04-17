let db = require('../db/index')

// 获取员工表全部数据信息
exports.getUser = (req, res) => {
  var sql = 'select * from user_info'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 获取员工表全部数据信息
exports.getUsers = (req, res) => {
  var sql = 'select * from users'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 获取个人中心信息
exports.getUserInfo = (req, res) => {
  var sql = 'select * from user_info where username = ?'
  db.query(sql, [req.query.username], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 修改个人信息

exports.updateUser = (req, res) => {
  var sql = 'update user_info set username = ?, password = ?, gender = ?, phone = ?, email = ?, address = ? where username = ?'
  db.query(sql, [req.query.username, req.query.password, req.query.gender, req.query.phone, req.query.email, req.query.address, req.auth.username], (err) => {
    if (err) {
      if (err.message.includes('username_UNIQUE')) {
        return res.send({
          status: 400,
          message: '用户名已存在',
        })
      }
    }
    res.send({
      status: 200,
      message: '修改成功，请重新登录',
    })
  })
}

// 更新邮箱地址
exports.updateInfo = (req, res) => {
  const sql = 'update user_info set gender = ?, phone = ?, email = ?, address = ? where username = ?'
  db.query(sql, [req.query.gender, req.query.phone, req.query.email, req.query.address, req.auth.username], (err) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '修改成功',
    })
  })

}

// 上传头像
exports.uploadavatar = (req, res) => {
  let file = req.file
  let fileName = file.filename
  let avatarUrl = '/upload/' + fileName
  let username = req.auth.username
  const sql = 'update user_info set avatar = ? where username = ?'
  db.query(sql, [avatarUrl, username], (err) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '上传头像成功',
      avatarUrl,
    })
  })
}

// 通过id查询数据
exports.searchById = (req, res) => {
  var sql = 'select * from user_info where user_id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 通过name查询数据
exports.searchByName = (req, res) => {
  var sql = 'select * from user_info where username like ?'
  db.query(sql, [req.query.username], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
