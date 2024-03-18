// 用于操作数据库
let db = require('../db/index')

// 获取个人信息
exports.getAdminInfo = (req, res) => {
  var sql = 'select * from admin_info where adminname = ?'
  db.query(sql, [req.query.adminname], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}

// 获取全部管理员信息
exports.getAdmin = (req, res) => {
  var sql = 'select * from admin_info'
  db.query(sql, (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}

// 修改个人信息
exports.updateAdmin = (req, res) => {
  var sql = 'update admin_info set adminname = ?, adminpassword = ?, adminphone = ?, adminemail = ? where adminname = ?'
  db.query(sql, [req.body.params.adminname, req.body.params.adminpassword, req.body.params.adminphone, req.body.params.adminemail, req.auth.adminname], (err) => {
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

// 更新电话邮箱
exports.updateInfo = (req, res) => {
  const sql = 'update admin_info set adminphone = ?, adminemail = ? where adminname = ?'
  db.query(sql, [req.body.params.adminphone, req.body.params.adminemail, req.auth.adminname], (err) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '修改成功',
    })
  })
}

// 多表查询获取员工信息
exports.getAllInfo = (req, res) => {
  const sql = 'select * from user_info left join users on user_info.user_id = users.id'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 多表查询用id或者name模糊查询
exports.getInfoByNameId = (req, res) => {
  const sql = 'select * from user_info left join users on user_info.user_id = users.id where user_info.user_id like ? or user_info.username like ?'
  db.query(sql, [`%${req.query.user_id}%`, `%${req.query.username}%`], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

// 修改用户
exports.updateUser = (req, res) => {
  const sql = 'update users set salary = ?, depart = ? where id = ?'
  db.query(sql, [req.body.params.salary, req.body.params.depart, req.body.params.id], (err) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '修改成功',
    })
  })
}

// 删除用户
exports.deleteUser = (req, res) => {
  const sql = 'delete from user_info where user_id = ?'
  db.query(sql, req.query.user_id, (err) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '删除成功',
    })
  })
}

// 上传头像
exports.uploadavatar = (req, res) => {
  let file = req.file
  let fileName = file.filename
  let avatarUrl = '/upload/' + fileName
  let adminname = req.auth.adminname
  const sql = 'update admin_info set avatar = ? where adminname = ?'
  db.query(sql, [avatarUrl, adminname], (err) => {
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
