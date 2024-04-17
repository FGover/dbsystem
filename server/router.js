// 用于配置对应路由
const express = require('express')
const router = express.Router()
const user = require('./API/user')
const login = require('./API/login')
const admin = require('./API/admin')
const excel = require('./API/excel')
const check = require('./API/check')
const holiday = require('./API/holiday')

// 上传文件
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'public/upload',
  filename: function (req, file, cb) {
    const fileFormat = file.originalname.split('.')
    // const filename = req.auth.username
    const filename = new Date().getTime()
    cb(null, filename + '.' + fileFormat[fileFormat.length - 1])
  },
})
const upload = multer({
  storage,
})

// 获取员工信息
router.get('/api/user', user.getUser)
router.get('/api/users', user.getUsers)
router.get('/api/allusers', admin.getAllInfo)
router.get('/api/admin', admin.getAdmin)

// 获取个人信息
router.get('/api/userinfo', user.getUserInfo)
router.get('/api/admininfo', admin.getAdminInfo)
router.get('/api/getbynameid', admin.getInfoByNameId)

// 更换头像
router.post('/api/uuploadavatar', upload.single('file'), user.uploadavatar)
router.post('/api/auploadavatar', upload.single('file'), admin.uploadavatar)

// excel导入
router.post('/api/importexcel', upload.single('file'), excel.importExcel)

// 修改个人信息
router.get('/api/updateuser', user.updateUser)
router.get('/api/updateinfo', user.updateInfo)
router.post('/api/updateadmin', admin.updateAdmin)
router.post('/api/updateInfo', admin.updateInfo)

// 修改用户
router.post('/api/updateuserwork', admin.updateUser)

// 删除用户
router.delete('/api/deluser', admin.deleteUser)

// 登录注册
router.get('/api/user/login', login.login1)
router.post('/api/user/register', login.register1)
router.get('/api/admin/login', login.login2)
router.post('/api/admin/register', login.register2)
router.get('/api/captcha', login.getCaptcha)

// 查询接口
router.get('/api/searchbyid', user.searchById)
router.get('/api/searchbyname', user.searchByName)

// 打卡签到
router.post('/api/check', check.check)
router.post('/api/checkout', check.check_out)
router.get('/api/checkid', check.check_id)
router.get('/api/check_list', check.check_list)
router.get('/api/check_record', check.check_record)

// 请假
router.get('/api/getleave', holiday.getLeave)
router.post('/api/submit', holiday.submit)
router.get('/api/approvalinfo', holiday.getApprovalInfo)
router.post('/api/disapproval', holiday.disapproval)
router.post('/api/approval', holiday.approval)

module.exports = router
