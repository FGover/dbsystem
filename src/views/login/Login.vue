<template>
  <div class="login">
    <div class="info">
      <h3>Sign in</h3>
      <div class="img">
        <img src="@/assets/胡桃.jpg" alt="">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" style="width: 80%" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" show-password style="width: 80%" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <div class="Captcha">
            <el-input v-model="ruleForm.captcha" style="width: 40%" clearable></el-input>
            <div class="captcha" v-html="captchaUrl" @click="getCaptcha"></div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" class="radio" label="1">员工</el-radio>
          <el-radio v-model="radio" class="radio" label="2">管理员</el-radio>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn" @click="login" @keyup.enter="keyDown">登录</el-button>
      <div class="txt" @click="toRegister">没有账号？前往注册</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    const validateCaptcha = (rule, value, callback) => {
      let captcha = localStorage.getItem('captcha')
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.toLowerCase() != captcha.toLowerCase()) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      checked: true,
      captchaUrl: '',
      radio: '1',
      ruleForm: {
        username: '',
        password: '',
        captcha: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, validator: validateCaptcha, trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    // 登录
    login() {
      if (this.radio == 1) {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.axios.get('user/login', {
              params: {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
              },
            })
            if (res.status == 200) {
              this.setToken(res.token)
              // this.$store.commit('setToken', res.token)
              localStorage.setItem('radio', this.radio)
              localStorage.setItem('user_id', res.data[0].user_id)
              localStorage.setItem('breadName', '图形数据')
              this.$router.push('/Main')
              this.$store.commit('saveUser', this.ruleForm.username)
              this.$message.success(res.message)
            } else if (res.status == 202) {
              this.$message.error(res.message)
            } else {
              this.$message.error(res.message)
            }
          }
        })
      } else {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const { data: res } = await this.axios.get('admin/login', {
              params: {
                adminname: this.ruleForm.username,
                adminpassword: this.ruleForm.password,
              },
            })
            if (res.status == 200) {
              this.setToken(res.token)
              localStorage.setItem('radio', this.radio)
              localStorage.setItem('breadName', '图形数据')
              localStorage.setItem('admin_id', res.data[0].admin_id)
              localStorage.setItem('adminname', res.data[0].adminname)
              this.$router.push('/Main')
              this.$store.commit('saveUser', this.ruleForm.username)
              this.$message.success(res.message)
            } else if (res.status == 202) {
              this.$message.error(res.message)
            } else {
              this.$message.error(res.message)
            }
          }
        })
      }
    },
    toRegister() {
      this.$router.push('/register')
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.login()
      }
    },
    // 获取验证码
    async getCaptcha() {
      const { data: res } = await this.axios.get('captcha')
      this.captchaUrl = res.captchaUrl
      localStorage.setItem('captcha', res.captcha)
    },
  },
  mounted() {
    //绑定事件
    window.addEventListener('keydown', this.keyDown)
    this.getCaptcha()
  },
  //销毁事件
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #e6a49d, #fff);
  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 500px;
    backdrop-filter: blur(10px);
    box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      margin-top: 20px;
      text-align: center;
      font-size: 26px;
      color: #fff;
      user-select: none;
    }
    .img {
      margin-top: 20px;
      width: 70px;
      height: 70px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    ::v-deep(.el-radio__input.is-checked + .el-radio__label) {
      color: #ebb5af !important;
    }
    ::v-deep(.el-radio__input.is-checked .el-radio__inner) {
      background: #ebb5af !important;
      border-color: #ebb5af !important;
    }

    ::v-deep(.el-input__inner) {
      border-radius: 8px;
    }
    ::v-deep(.el-input__inner:focus) {
      border-color: #ebb5af !important;
    }
    .radio {
      color: #fff;
    }
    .demo-ruleForm {
      margin: 30px auto;
    }

    .btn {
      position: absolute;
      top: 88%;
      left: 44%;
      width: 80px;
      text-align: center;
      transform: translate(-50%, -50%);
      background-color: #c08f8a;
      border: #c08f8a;
    }

    .txt {
      font-size: 12px;
      position: absolute;
      top: 88%;
      left: 70%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      user-select: none;
      color: #fff;
    }
    .Captcha {
      display: flex;
      .captcha {
        width: 100px;
        height: 40px;
        margin-left: 10px;
        height: 45px;
        border-radius: 5px;
      }
    }
  }
}
</style>
