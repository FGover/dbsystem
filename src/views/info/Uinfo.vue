<template>
  <div class="uinfo">
    <el-card>
      <div class="card">
        <el-upload action="#" :show-file-list="false" :http-request="uploadAvatar" :before-upload="beforeAvatarUpload">
          <img :src="imageUrl" alt="" width="130" height="130" style="border-radius: 5%" />
        </el-upload>
        <div class="txt">用户名：{{ userInfo.username }}</div>
        <div class="txt">性别：{{ userInfo.gender }}</div>
        <div class="txt">电话：{{ userInfo.phone }}</div>
        <div class="txt">邮箱：{{ userInfo.email }}</div>
        <div class="txt">地址：{{ userInfo.address }}</div>
        <div class="txt">
          <el-button type="primary" @click="show">修改信息</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" label-width="70px" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password clearable type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Uinfo',
  data() {
    // 手机号码正则校验
    const checkPhone = (rule, value, cb) => {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    }
    // 邮箱的正则校验
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      photo: '',
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' },
        ],
        phone: { validator: checkPhone, trigger: 'blur' },
        email: { validator: checkEmail, trigger: 'blur' },
      },
      userInfo: {},
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.username,
    }),
    imageUrl() {
      return this.photo
    },
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.axios.get('/userinfo', {
        params: {
          username: localStorage.getItem('username'),
        },
      })
      this.userInfo = res[0]
      if (res[0].avatar) {
        this.photo = require('../../../server/public' + res[0].avatar)
      }
    },
    show() {
      this.form.username = this.userInfo.username
      this.form.password = this.userInfo.password
      this.form.gender = this.userInfo.gender
      this.form.phone = this.userInfo.phone
      this.form.email = this.userInfo.email
      this.form.address = this.userInfo.address
      this.dialogFormVisible = true
    },
    update() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form.username !== this.userInfo.username || this.form.password !== this.userInfo.password) {
            const { data: res } = await this.axios.get('updateuser', {
              params: {
                username: this.form.username,
                password: this.form.password,
                gender: this.form.gender,
                phone: this.form.phone,
                email: this.form.email,
                address: this.form.address,
              },
            })
            if (res.status === 400) {
              this.$message.error(res.message)
            } else {
              this.$message.success(res.message)
              this.dialogFormVisible = false
              this.$router.push('/login')
              localStorage.clear()
            }
          } else {
            const { data: res } = await this.axios.get('updateinfo', {
              params: {
                gender: this.form.gender,
                phone: this.form.phone,
                email: this.form.email,
                address: this.form.address,
              },
            })
            console.log(res)
            this.$message.success('修改成功')
            this.dialogFormVisible = false
            this.getUserInfo()
          }
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async uploadAvatar(file) {
      let formData = new FormData()
      formData.append('file', file.file)
      const { data: res } = await this.axios.post('uuploadavatar', formData)
      if (res.status === 200) {
        this.$message.success('上传头像成功')
        this.photo = require('../../../server/public' + res.avatarUrl)
      }
    },
  },
}
</script>

<style scoped>
.uinfo {
  position: relative;
}
.el-card {
  margin-top: 20px;
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.txt {
  margin-top: 20px;
}
</style>
