let db = require('../db/index')

// 获取个人请假信息
exports.getLeave = (req, res) => {
  const sql = 'select * from holiday where user_id = ?'
  db.query(sql, [req.query.user_id], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}

// 提交申请
exports.submit = (req, res) => {
  const sql = 'insert into holiday (user_id, reason, start_time, end_time) values (?, ?, ?, ?)'
  db.query(sql, [req.body.params.user_id, req.body.params.reason, req.body.params.start_time, req.body.params.end_time], (err) => {
    if (err) return res.send('错误：' + err.message)
    res.send({
      status: 200,
      message: '提交成功',
    })
  })
}

// 多表查询获取所有员工的待审批请假信息
exports.getApprovalInfo = (req, res) => {
  const sql = 'select holiday.*, user_info.username from holiday, user_info where status = ? and holiday.user_id = user_info.user_id'
  db.query(sql, ['待审批'], (err, data) => {
    if (err) return res.send('错误：' + err.message)
    res.send(data)
  })
}

// 不同意申请
exports.disapproval = (req, res) => {
  const sql = 'update holiday set status = ?, admin_id = ?, admin_name = ? where id = ?'
  db.query(sql, ['审批拒绝', req.body.params.admin_id, req.body.params.admin_name, req.body.params.id], (err) => {
    if (err) return res.send('错误：' + err.message)
    res.send({
      status: 200,
      message: '已拒绝申请',
    })
  })
}

// 同意申请
exports.approval = (req, res) => {
  const sql = 'update holiday set status = ?, admin_id = ?, admin_name = ? where id = ?'
  db.query(sql, ['审批通过', req.body.params.admin_id, req.body.params.admin_name, req.body.params.id], (err) => {
    if (err) return res.send('错误：' + err.message)
    res.send({
      status: 200,
      message: '申请通过',
    })
  })
}
