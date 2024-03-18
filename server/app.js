let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')


//  配置解析，用于解析json和urlencode格式的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'token', 'Content-Type')
  next()
})

// 解析token
let expressJWT = require('express-jwt')
let config = require('./config')
app.use(expressJWT.expressjwt({ secret: config.secretKey, algorithms: ['HS256'] }).unless({ path: config.unRoute }))
app.use((err, req, res, next) => {
  res.send({ status: 401, message: '无效的token, 请重新登录' })
  next()
})

//  配置跨域，必须在路由之前
app.use(cors())

// 配置路由
app.use(router)

app.listen(90, () => {
  console.log('服务器启动成功')
})

module.exports.app = app
