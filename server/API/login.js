let db = require('../db/index')
// 生成token
let jwt = require('jsonwebtoken')
let config = require('../config')
let svgCaptcha = require('svg-captcha')


// 员工登录
exports.login1 = (req, res) => {
  var sql = 'select * from user_info where username = ? and password = ?'
  db.query(sql, [req.query.username, req.query.password], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '登录失败'
      })
    }
    if (data.length > 0) {
      let tokenStr = jwt.sign({ username: req.query.username }, config.secretKey, { expiresIn: config.expiresIn })
      res.send({
        status: 200,
        message: '登录成功',
        token: 'Bearer ' + tokenStr,
        data: data
      })
    } else {
      res.send({
        status: 202,
        message: '用户名或密码错误'
      })
    }
  })
}

// 员工注册
exports.register1 = (req, res) => {
  const sql1 = 'select * from user_info where username = ?'
  const sql2 = 'insert into user_info (username, password) value (?, ?)'
  db.query(sql1, [req.body.params.username], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '注册失败'
      })
    }
    if (data.length > 0) {
      return res.send({
        status: 202,
        message: '该用户名已存在'
      })
    } else {
      db.query(sql2, [req.body.params.username, req.body.params.password], (err) => {
        if (err) {
          return res.send({
            status: 400,
            message: '注册失败'
          })
        }
        res.send({
          status: 200,
          message: '注册成功'
        })
      })
    }
  })
}

// 管理员登录
exports.login2 = (req, res) => {
  var sql = 'select * from admin_info where adminname = ? and adminpassword = ?'
  db.query(sql, [req.query.adminname, req.query.adminpassword], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '登录失败'
      })
    }
    if (data.length > 0) {
      let tokenStr = jwt.sign({ adminname: req.query.adminname }, config.secretKey, { expiresIn: config.expiresIn })
      res.send({
        status: 200,
        message: '登录成功',
        token: 'Bearer ' + tokenStr,
        data: data
      })
    } else {
      res.send({
        status: 202,
        message: '用户名或密码错误'
      })
    }
  })
}

// 管理员注册
exports.register2 = (req, res) => {
  const sql1 = 'select * from admin_info where adminname = ?'
  const sql2 = 'insert into admin_info (adminname, adminpassword) value (?, ?)'
  db.query(sql1, [req.body.params.adminname], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '注册失败'
      })
    }
    if (data.length > 0) {
      return res.send({
        status: 202,
        message: '该用户名已存在'
      })
    } else {
      db.query(sql2, [req.body.params.adminname, req.body.params.adminpassword], (err) => {
        if (err) {
          return res.send({
            status: 400,
            message: '注册失败'
          })
        }
        res.send({
          status: 200,
          message: '注册成功'
        })
      })
    }
  })
}

// 验证码
exports.getCaptcha = (req, res) => {
  let captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1liO',
    noise: 2,
    color: true,
    background: '#f7f7f7',
    width: 107,
    height: 40
  })
  res.send({
    captcha: captcha.text,
    captchaUrl: captcha.data
  })
}